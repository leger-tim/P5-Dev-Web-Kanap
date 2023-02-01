let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

function panier() {

    for (let i = 0; i < produitDansLocalStorage.length; i++) {
        fetch("http://localhost:3000/api/products/" + produitDansLocalStorage[i].idProduit)
            .then(data => data.json())
            .then(produit => afficher(produit));

        // Crée les éléments html pour chaque produit ajouté au panier 

        // Changer le nom des variables div1, div2 etc
        // Sortir la définition de la fonction de la boucle 

        function afficher(produit) {
            const selection = document.querySelector("#cart__items");
            const article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute("data-id", produitDansLocalStorage[i].idProduit); //assigne l'id dans data id 
            article.setAttribute("data-color", produitDansLocalStorage[i].couleurProduit);
            const div1 = document.createElement("div");
            div1.classList.add("cart__item__img");
            const imgElt = document.createElement("img");
            imgElt.src = produit.imageUrl;
            imgElt.alt = produit.altTxt;
            const div2 = document.createElement("div");
            div2.classList.add("cart__item__content");
            const div21 = document.createElement("div");
            div21.classList.add("cart__item__content__description");
            const div22 = document.createElement("div");
            div22.classList.add("cart__item__content__settings");
            const div221 = document.createElement("div");
            div221.classList.add("cart__item__content__settings__quantity");
            const quantite = document.createElement("p");
            quantite.innerText = "Qté :";

            const input = document.createElement("input");
            input.classList.add("itemQuantity");
            input.value = produitDansLocalStorage[i].quantiteProduit;
            input.name = "itemQuantity";
            input.min = 1;
            input.max = 100;
            input.type = "number";

            const div222 = document.createElement("div");
            div222.classList.add("cart__item__content__settings__delete");

            const supprimer = document.createElement("p");
            supprimer.classList.add("deleteItem");
            supprimer.innerText = "Supprimer"

            //réviser ${} remplacement javascript dans html, innertext devrait contenir du texte seulement  
            const title = document.createElement("h2");
            title.innerText = produit.name;

            const couleur = document.createElement("p");
            couleur.innerText = produitDansLocalStorage[i].couleurProduit;

            const prix = document.createElement("p");
            prix.innerText = produit.price + " €";


            selection.appendChild(article);
            article.appendChild(div1);
            div1.appendChild(imgElt);
            article.appendChild(div2);
            div2.appendChild(div21);
            div2.appendChild(div22);
            div21.appendChild(title);
            div21.appendChild(couleur);
            div21.appendChild(prix);
            div22.appendChild(div221);
            div221.appendChild(quantite);
            div22.appendChild(div222);
            div221.appendChild(input);
            div222.appendChild(supprimer);

            // Modifier la valeur des input dans le localstorage

            let inputQuantite = document.querySelectorAll(".itemQuantity");
            for (let i = 0; i < inputQuantite.length; i++) {
                if (inputQuantite[i].value > 100) {
                    alert("La quantité maximale d'un produit que vous pouvez commander est 100 unités");
                    inputQuantite[i].value = 100;
                }

                inputQuantite[i].addEventListener("change", function () {
                    let nouvelleQuantite = parseInt(this.value);
                    let closest = this.closest("[data-id][data-color]");
                    const id = closest.getAttribute("data-id");
                    const color = closest.getAttribute("data-color");
                    if (inputQuantite[i].value > 100) {
                        alert("La quantité maximale d'un produit que vous pouvez commander est 100 unités");
                        inputQuantite[i].value = 100;
                    }
                    let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

                    for (let i = 0; i < produitDansLocalStorage.length; i++) {
                        if (produitDansLocalStorage[i].idProduit === id && produitDansLocalStorage[i].couleurProduit === color) {
                            produitDansLocalStorage[i].quantiteProduit = nouvelleQuantite;
                            localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
                            break;
                        }
                    }
                });
            }



            //Bouton supprimer 

            let supprimerProduit = document.querySelectorAll(".deleteItem");
            for (let i = 0; i < supprimerProduit.length; i++) {
                supprimerProduit[i].addEventListener("click", function () {
                    // let closestArticle = this.closest(".cart__item");
                    // closestArticle.remove();
                    let closest = this.closest("[data-id][data-color]");
                    const id = closest.getAttribute("data-id");
                    const color = closest.getAttribute("data-color");
                    closest.remove();
                    let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
                    for (let i = 0; i < produitDansLocalStorage.length; i++) {
                        if (produitDansLocalStorage[i].idProduit === id && produitDansLocalStorage[i].couleurProduit === color) {
                            produitDansLocalStorage.splice(i, 1);
                            localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
                            updateTotals();
                            break;
                        }

                    }
                    // produitDansLocalStorage[i] 
                    // réussir à supprimer un élément en particulier du local storage + modifier directement le total des prix 
                    // et la quantité 

                })
            }

            // // Calculer et afficher le total des articles dans le Panier et le prix total

            let itemQuantity = document.querySelectorAll(".itemQuantity");
            const totalQuantity = document.getElementById("totalQuantity");
            const totalPrice = document.getElementById("totalPrice");


            updateTotals();

            for (let i = 0; i < itemQuantity.length; i++) {
                itemQuantity[i].addEventListener("change", updateTotals);
            }


            function updateTotals() {
                const prixProduitPanier = document.querySelectorAll(".cart__item__content__description :nth-child(3)");
                itemQuantity = document.querySelectorAll(".itemQuantity");
                let quantity = 0;
                let total = 0;
                for (let i = 0; i < itemQuantity.length; i++) {
                    quantity += parseInt(itemQuantity[i].value);
                    total += (parseInt(itemQuantity[i].value) * parseInt(prixProduitPanier[i].innerText));
                }
                totalQuantity.innerText = quantity;
                totalPrice.innerText = total;
            }


        }
    }
}

panier();

const prenomRegex = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;

let prenom = document.getElementById("firstName");
prenom.addEventListener('change', function (e) {

    prenom = e.target.value;
    if (prenomRegex.test(prenom) === true) {

    } else {
        prenomErreur = document.getElementById("firstNameErrorMsg");
        prenomErreur.innerHTML = "Utilisez seulement des lettres !";

    }

})

let nom = document.getElementById("lastName");
nom.addEventListener("change", function (e) {
    nom = e.target.value;
    nomErreur = document.getElementById("lastNameErrorMsg");
    if (prenomRegex.test(nom) === true) {
        nomErreur.innerHTML = "";

    } else {
        nomErreur.innerHTML = "Utilisez seulement des lettres !";

    }
})

const addRegex = /^[a-zA-Z0-9éèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;

let adresse = document.getElementById("address");
adresse.addEventListener("change", function (e) {
    adresse = e.target.value;
    adresseErreur = document.getElementById("addressErrorMsg");
    if (addRegex.test(adresse) === true) {
        adresseErreur.innerHTML = "";

    } else {
        adresseErreur.innerHTML = "Utilisez seulement des chiffres et des lettres !";

    }
})
let ville = document.getElementById("city");
ville.addEventListener("change", function (e) {
    ville = e.target.value;
    villeErreur = document.getElementById("cityErrorMsg");
    if (prenomRegex.test(ville) === true) {
        villeErreur.innerHTML = "";
    } else {
        villeErreur.innerHTML = "Utilisez seulement des lettres !"
    }
})

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let email = document.getElementById("email");
email.addEventListener("change", function (e) {
    email = e.target.value;
    emailErreur = document.getElementById("emailErrorMsg");
    if (emailRegex.test(email) === true) {
        emailErreur.innerHTML = "";

    } else {
        emailErreur.innerHTML = "Adresse mail non valide !"
    }
})

let commander = document.getElementById("order");
commander.addEventListener("click", function (e) {
    e.preventDefault();
    let contact = new Object();
    contact.firstName = prenom;
    contact.lastName = nom;
    contact.address = adresse;
    contact.city = ville;
    contact.email = email;
    console.log(contact);

    const articleCommander = document.querySelectorAll('.cart__item');

    let products = [];

    for (let i = 0; i < articleCommander.length; i++) {
        const idProduitCommander = articleCommander[i].getAttribute('data-id');

        products.push(idProduitCommander);

    }


    const aEnvoyer = {
        products,
        contact,
    };

    console.log(aEnvoyer);
    let envoyerCommande = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },

    });



    envoyerCommande.then(async (response) => {
        try {

            const contenu = await response.json();
            console.log(contenu);
            console.log(contenu.orderId);
            window.location.href = "./confirmation.html?orderId=" + contenu.orderId;
            console.log(contenu.orderId);
            

        } catch (e) {
            console.log(e);
        }
        
    })
    




    
})











// TODO : 

