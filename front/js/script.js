// Récupère les données des produits 

fetch("http://localhost:3000/api/products")
    .then (data => data.json())
    .then (articles => afficher(articles));

// Crée les éléments des produits

function afficher(articles) {
    let imageElt;
    let nomElt;
    let descriptionElt;
    let articleElt;
    let lienElt;
    for (const article of articles) {
                imageElt = document.createElement("img");
                imageElt.src = article.imageUrl;
                nomElt = document.createElement("h3");
                nomElt.innerText = article.name;
                descriptionElt = document.createElement("p");
                descriptionElt.innerText = article.description;
                articleElt = document.createElement("article");
                articleElt.appendChild(imageElt);
                articleElt.appendChild(nomElt);
                articleElt.appendChild(descriptionElt);
                lienElt = document.createElement("a");
                lienElt.setAttribute("href", "./product.html?id="+article._id);
                lienElt.appendChild(articleElt);
                document.getElementById("items").appendChild(lienElt);
                }
    }




