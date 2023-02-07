//Récupère l'order Id dans l'url de la page 

let str = location.href;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

// Injecte l'order Id dans le HTML

let orderIdTexte = document.getElementById("orderId");
orderIdTexte.innerHTML = orderId;
