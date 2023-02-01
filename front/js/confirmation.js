let str = location.href;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

let orderIdTexte = document.getElementById("orderId");
orderIdTexte.innerHTML = orderId;
