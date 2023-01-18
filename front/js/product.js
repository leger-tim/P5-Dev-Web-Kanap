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



    
