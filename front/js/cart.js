


let produitDansPanier = JSON.parse(localStorage.getItem("produit"));

let total = 0;

async function obtenirTotalPrix() {
    for (let i = 0; i < produitDansPanier.length; i++) {
        let id = produitDansPanier[i].idProduit;
        let quantite = produitDansPanier[i].quantiteProduit;

        try {
            let response = await fetch("http://localhost:3000/api/products/" + id);
            let data = await response.json();
            let prix = data.price;
            let montant = prix * quantite;
            total += montant;
        } catch (error) {
        }
    }
    let afficherTotalPrix = document.getElementById("totalPrice")
    afficherTotalPrix.innerText = total;
}
async function panier() {

    for (let i = 0; i < produitDansPanier.length; i++) {
        fetch("http://localhost:3000/api/products/" + produitDansPanier[i].idProduit)
            .then(data => data.json())
            .then(produit => afficher(produit));

        function afficher(produit) {
            const selection = document.querySelector("#cart__items");
            const article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute("data-id", produitDansPanier[i].idProduit); //assigne l'id dans data id 
            article.setAttribute("data-color", produitDansPanier[i].couleurProduit);
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
            input.value = produitDansPanier[i].quantiteProduit;
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
            couleur.innerText = produitDansPanier[i].couleurProduit;

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

            for (let i in produitDansPanier) {
                total += produitDansPanier[i].quantiteProduit;
            }

            let afficherTotal = document.getElementById("totalQuantity");
            afficherTotal.innerText = total;

            obtenirTotalPrix();



            let changeQuantite = document.querySelectorAll(".itemQuantity");
            for (let i = 0; i < changeQuantite.length; i++) {
                changeQuantite[i].addEventListener('change', changer);
            }
            function changer(e) {
                e.preventDefault();
                const closest = e.target.closest("[data-id][data-color]");
                if (closest) {
                    // faire quelque chose avec closest
                    const id = closest.getAttribute("data-id");
                    const color = closest.getAttribute("data-color");
                    console.log(id, color, e.target.value);
                    let localsto = localStorage.getItem("produit");
                    console.log(localsto);
                    localStorage.setItem("quantiteProduit", e.target.value);
                }
            }

        }


    };

}
panier();



