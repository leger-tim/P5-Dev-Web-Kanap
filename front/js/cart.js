let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

function panier() {

    for (let i = 0; i < produitDansLocalStorage.length; i++) {
        fetch("http://localhost:3000/api/products/" + produitDansLocalStorage[i].idProduit)
            .then(data => data.json())
            .then(produit => afficher(produit));

        // Crée les éléments html pour chaque produit ajouté au panier 

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

            const title = document.createElement("h2");
            title.innerText = `${produit.name}`;

            const couleur = document.createElement("p");
            couleur.innerText = produitDansLocalStorage[i].couleurProduit;

            const prix = document.createElement("p");
            prix.innerText = `${produit.price} €`;

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
                inputQuantite[i].addEventListener("change", function () {
                    let nouvelleQuantite = parseInt(this.value);
                    let closest = this.closest("[data-id][data-color]");
                    const id = closest.getAttribute("data-id");
                    const color = closest.getAttribute("data-color");
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

            //Calculer et afficher quantité d'articles dans le Panier

            let total = 0;

            for (let i in produitDansLocalStorage) {
                total += produitDansLocalStorage[i].quantiteProduit;
            }

            let afficherTotal = document.getElementById("totalQuantity");
            afficherTotal.innerText = total;

            // Calculer et afficher le prix total des produits 

            async function obtenirTotalPrix() {
                let totalPrix = 0;
                for (let i = 0; i < produitDansLocalStorage.length; i++) {
                    let id = produitDansLocalStorage[i].idProduit;
                    let quantite = produitDansLocalStorage[i].quantiteProduit;
                    try {
                        let response = await fetch("http://localhost:3000/api/products/" + id);
                        let data = await response.json();
                        let prix = data.price;
                        let montant = prix * quantite;
                        totalPrix += montant;
                    } catch (error) {
                        console.log(error);
                    }
                }
                let afficherTotalPrix = document.getElementById("totalPrice");
                afficherTotalPrix.innerText = totalPrix;
            }
            obtenirTotalPrix();

        }
    }
}

panier();
