//Récupère l'Id dans l'url de la page 

let str = location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

// Récupère les données d'un produit grâce à son Id 

fetch("http://localhost:3000/api/products/" + id)
  .then(data => data.json())
  .then(produit => afficher(produit));

// Fonction qui crée tous les éléments du produits et donne l'option de choisir la couleur 

function afficher(produit) {
  const imgElt = document.createElement("img");
  imgElt.src = produit.imageUrl;
  imgElt.alt = produit.altTxt;
  document.querySelector(".item__img").appendChild(imgElt);
  document.getElementById("title").textContent = produit.name;
  document.getElementById("price").textContent = produit.price;
  document.getElementById("description").textContent = produit.description;
  for (color of produit.colors) {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    document.getElementById("colors").appendChild(option);
  }
}

// Constante add qui sélectionne le bouton grâce à son id et submit écoute clic ou "entrer"

const add = document.querySelector("#addToCart");
add.addEventListener("click", function (event) {
  event.preventDefault(); // permet d'annuler les effets par défaut du bouton

  // Au clic, la valeur de la couleur et de la quantité sont récupérés
  
  const idCouleur = document.querySelector("#colors");
  const choixCouleur = idCouleur.value;
  const idQuantite = document.querySelector("#quantity");
  const choixQuantite = idQuantite.value;

  // Alerte si une couleur n'a pas été sélectionné et une quantité indiquée

  if (choixCouleur) {

  } else {
    alert("Vous devez sélectionner une couleur");
    return;
  }

  if (choixQuantite !== null && 0 < choixQuantite && choixQuantite < 101) {

  } else {
    alert("Vous devez indiquer une quantité entre 1 et 100");
    return;
  }

  // Création de l'objet produitPanier

  const produitPanier = {
    idProduit: id,
    quantiteProduit: parseInt(choixQuantite), //parseInt permet de changer un nombre en string
    couleurProduit: choixCouleur
  }
  
  // Récupération du localstorage et transformation en objet 

  let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

  // Ajoute des éléments dans le localstorage

  if (produitDansLocalStorage) {

    for (let i = 0; i < produitDansLocalStorage.length; i++) {

      // Vérifie si idProduit et couleurProduit sont identiques
      if (produitDansLocalStorage[i].idProduit === produitPanier.idProduit && produitDansLocalStorage[i].couleurProduit === produitPanier.couleurProduit) {

        // Vérifie que la quantité totale du produit sélectionné est inférieure ou égale à 100

        if (produitDansLocalStorage[i].quantiteProduit + produitPanier.quantiteProduit > 100) {
          alert("La quantité totale du produit sélectionné ne doit pas dépasser 100");
          return;
        } else {

        };
        
        // Incrémente la quantité si les propriétés sont identiques

        produitDansLocalStorage[i].quantiteProduit += produitPanier.quantiteProduit;
        localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
        alert("Votre article a été ajouté au panier");
        return;
      }
    }
    produitDansLocalStorage.push(produitPanier);
    localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));

  }
  else {
    produitDansLocalStorage = [];
    produitDansLocalStorage.push(produitPanier);
    localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
  };
  alert("Votre article a été ajouté au panier");

})


