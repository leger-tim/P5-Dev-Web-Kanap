let str = location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

fetch("http://localhost:3000/api/products/"+id)
    .then (data => data.json())
    .then (produit => afficher(produit));

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

// constante add qui sélectionne le bouton grâce à son id et submit écoute clic ou "entrer"

const form = document.querySelector(".item")
const add = document.querySelector("#addToCart");
add.addEventListener("click", function(event) {
  event.preventDefault(); // permet d'annuler les effets par défaut du bouton
  const idCouleur = document.querySelector("#colors");
  const choixCouleur = idCouleur.value;
  const idQuantite = document.querySelector("#quantity");
  const choixQuantite = idQuantite.value;


  const produitPanier = {
    idProduit: id,
    quantiteProduit: parseInt(choixQuantite), //parseInt permet de changer un nombre en string
    couleurProduit: choixCouleur,
  }
  console.log(produitPanier);
  
  
  let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
  
  if(produitDansLocalStorage){
    produitDansLocalStorage.push(produitPanier);
    localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
    console.log(produitDansLocalStorage);

  }
  else {
    produitDansLocalStorage = [];
    produitDansLocalStorage.push(produitPanier);
    localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
    console.log(produitDansLocalStorage);

  };

})



    
