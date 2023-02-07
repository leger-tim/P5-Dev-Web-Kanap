let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

//Récupère les données du localstorage pour vérifier quel produit est présent

function panier() {
  for (let i = 0; i < produitDansLocalStorage.length; i++) {
    fetch(
      "http://localhost:3000/api/products/" +
        produitDansLocalStorage[i].idProduit
    )
      .then((data) => data.json())
      .then((produit) => afficher(produit));

    // Crée les éléments html pour chaque produit du panier
    // SE RENSEIGNER SUR LA PORTEE DES VARIABLES POUR REFACTORISER (OPTIONNEL)
    // On a changé innerhtml par innertext il faut réviser 

    function afficher(produit) {
        const selection = document.querySelector("#cart__items");
        const article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id", produitDansLocalStorage[i].idProduit); //assigne l'id dans data id
        article.setAttribute("data-color", produitDansLocalStorage[i].couleurProduit);
        const divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        const imgElt = document.createElement("img");
        imgElt.src = produit.imageUrl;
        imgElt.alt = produit.altTxt;
        const divContent = document.createElement("div");
        divContent.classList.add("cart__item__content");
        const divContentDescription = document.createElement("div");
        divContentDescription.classList.add("cart__item__content__description");
        const divContentSettings = document.createElement("div");
        divContentSettings.classList.add("cart__item__content__settings");
        const divContentSettingsQuantity = document.createElement("div");
        divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        const quantite = document.createElement("p");
        quantite.innerText = "Qté :";
    
        const input = document.createElement("input");
        input.classList.add("itemQuantity");
        input.value = produitDansLocalStorage[i].quantiteProduit;
        input.name = "itemQuantity";
        input.min = 1;
        input.max = 100;
        input.type = "number";
    
        const divContentSettingsDelete = document.createElement("div");
        divContentSettingsDelete.classList.add("cart__item__content__settings__delete");
    
        const supprimer = document.createElement("p");
        supprimer.classList.add("deleteItem");
        supprimer.innerText = "Supprimer";
    
        //réviser ${} remplacement javascript dans html, innertext devrait contenir du texte seulement A SUPPRIMER 

        const title = document.createElement("h2");
        title.innerText = produit.name;
    
        const couleur = document.createElement("p");
        couleur.innerText = produitDansLocalStorage[i].couleurProduit;
    
        const prix = document.createElement("p");
        prix.innerText = produit.price + " €";
    
        selection.appendChild(article);
        article.appendChild(divImg);
        divImg.appendChild(imgElt);
        article.appendChild(divContent);
        divContent.appendChild(divContentDescription);
        divContent.appendChild(divContentSettings);
        divContentDescription.appendChild(title);
        divContentDescription.appendChild(couleur);
        divContentDescription.appendChild(prix);
        divContentSettings.appendChild(divContentSettingsQuantity);
        divContentSettingsQuantity.appendChild(quantite);
        divContentSettings.appendChild(divContentSettingsDelete);
        divContentSettingsQuantity.appendChild(input);
        divContentSettingsDelete.appendChild(supprimer);
    
      // Modifier la valeur des input dans le localstorage

      let inputQuantite = document.querySelectorAll(".itemQuantity");
      for (let i = 0; i < inputQuantite.length; i++) {
        

        inputQuantite[i].addEventListener("change", function () {
          let nouvelleQuantite = parseInt(this.value);
          let closest = this.closest("[data-id][data-color]");
          const id = closest.getAttribute("data-id");
          const color = closest.getAttribute("data-color");
          
          if (inputQuantite[i].value !== null && 0 < inputQuantite[i].value && inputQuantite[i].value < 101) {
            
          }else {
            alert(
              "Veuillez choisir une quantité entre 1 et 100 ou supprimer l'article"
            );
            inputQuantite[i].value = 1;

            return;
          }

          let produitDansLocalStorage = JSON.parse(
            localStorage.getItem("produit")
          );

          for (let i = 0; i < produitDansLocalStorage.length; i++) {
            if (
              produitDansLocalStorage[i].idProduit === id &&
              produitDansLocalStorage[i].couleurProduit === color
            ) {
              produitDansLocalStorage[i].quantiteProduit = nouvelleQuantite;
              localStorage.setItem(
                "produit",
                JSON.stringify(produitDansLocalStorage)
              );
              break;
            }
          }
        });
      }

      //Bouton supprimer un produit

      let supprimerProduit = document.querySelectorAll(".deleteItem");
      for (let i = 0; i < supprimerProduit.length; i++) {
        supprimerProduit[i].addEventListener("click", function () {
          let closest = this.closest("[data-id][data-color]");
          const id = closest.getAttribute("data-id");
          const color = closest.getAttribute("data-color");
          closest.remove();
          let produitDansLocalStorage = JSON.parse(
            localStorage.getItem("produit")
          );
          for (let i = 0; i < produitDansLocalStorage.length; i++) {
            if (
              produitDansLocalStorage[i].idProduit === id &&
              produitDansLocalStorage[i].couleurProduit === color
            ) {
              produitDansLocalStorage.splice(i, 1);
              localStorage.setItem(
                "produit",
                JSON.stringify(produitDansLocalStorage)
              );
              updateTotals();
              break;
            }
          }          
        });
      }

      // Calculer et afficher le total des articles dans le Panier et le prix total

      let itemQuantity = document.querySelectorAll(".itemQuantity");
      const totalQuantity = document.getElementById("totalQuantity");
      const totalPrice = document.getElementById("totalPrice");

      updateTotals();

      for (let i = 0; i < itemQuantity.length; i++) {
        itemQuantity[i].addEventListener("change", updateTotals);
      }

      function updateTotals() {
        const prixProduitPanier = document.querySelectorAll(
          ".cart__item__content__description :nth-child(3)"
        );
        itemQuantity = document.querySelectorAll(".itemQuantity");
        let quantity = 0;
        let total = 0;
        for (let i = 0; i < itemQuantity.length; i++) {
          quantity += parseInt(itemQuantity[i].value);
          total +=
            parseInt(itemQuantity[i].value) *
            parseInt(prixProduitPanier[i].innerText);
        }
        totalQuantity.innerText = quantity;
        totalPrice.innerText = total;
      }
    }
  }
}

panier();

// Création des régex pour chaque champ du formulaire et test si les caractères entrés sont valides 

const prenomRegex = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
const nomRegex = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
const villeRegex = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
const addRegex = /^[a-zA-Z0-9éèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let prenom;
let nom;
let adresse;
let ville; 
let email;

let prenomInput = document.getElementById("firstName");
let prenomErreur = document.getElementById("firstNameErrorMsg");
prenomInput.addEventListener("change", function (e) {
  prenom = e.target.value;
  if (prenomRegex.test(prenom) === true) {
    prenomErreur.innerText = "";
  } else {
    prenomErreur.innerText = "Utilisez seulement des lettres !";
    return;
  }
});

let nomInput = document.getElementById("lastName");
let nomErreur = document.getElementById("lastNameErrorMsg");
nomInput.addEventListener("change", function (e) {
  nom = e.target.value;
  if (nomRegex.test(nom) === true) {
    nomErreur.innerText = "";
  } else {
    nomErreur.innerText = "Utilisez seulement des lettres !";
    return;
  }
});

let adresseInput = document.getElementById("address");
let adresseErreur = document.getElementById("addressErrorMsg");
adresseInput.addEventListener("change", function (e) {
  adresse = e.target.value;
  if (addRegex.test(adresse) === true) {
    adresseErreur.innerText = "";
  } else {
    adresseErreur.innerText = "Utilisez seulement des chiffres et des lettres !";
    return;
  }
});

let villeInput = document.getElementById("city");
let villeErreur = document.getElementById("cityErrorMsg");
villeInput.addEventListener("change", function (e) {
  ville = e.target.value;
  if (villeRegex.test(ville) === true) {
    villeErreur.innerText = "";
  } else {
    villeErreur.innerText = "Utilisez seulement des lettres !";
    return;
  }
});

let emailInput = document.getElementById("email");
let emailErreur = document.getElementById("emailErrorMsg");
emailInput.addEventListener("change", function (e) {
  email = e.target.value;
  if (emailRegex.test(email) === true) {
    emailErreur.innerText = "";
  } else {
    emailErreur.innerText = "Adresse mail non valide !";
    return;
  }
});


// Crée un objet contact avec les éléments entrés dans le formulaire 

let commander = document.getElementById("order");
commander.addEventListener("click", function (e) {
  
  e.preventDefault();

  // Vérifie si les entrées sont correctes

  if (!prenomRegex.test(prenom) || !nomRegex.test(nom) || !addRegex.test(adresse) || !villeRegex.test(ville) || !emailRegex.test(email)) {
    alert("Il y a des erreurs dans le formulaire");
    return;
  }

  let contact = {
    firstName: prenom,
    lastName: nom,
    address: adresse,
    city: ville,
    email: email
    };

    // Vérifie si les éléments de contact sont non vides 

    if (!contact.firstName || !contact.lastName || !contact.address || !contact.city || !contact.email) {
      alert("Il faut remplir tous les champs du formulaire")
      return;
  } else {
  }

  // Récupére et stocke l'id des produits présents dans le panier

  const articleCommander = document.querySelectorAll(".cart__item");

  let products = [];

  for (let i = 0; i < articleCommander.length; i++) {
    const idProduitCommander = articleCommander[i].getAttribute("data-id");

    products.push(idProduitCommander);
  }

  const aEnvoyer = {
    products,
    contact,
  };

  // Post dans l'api le formulaire et l'id des produits 

    let envoyerCommande = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // Redirige vers la page confirmation avec l'order Id retourné par l'api 

    envoyerCommande.then(async (response) => {
    try {
        const contenu = await response.json();
        window.location.href = "./confirmation.html?orderId=" + contenu.orderId;
    } catch (e) {
    }
  });
})

