// =====================
// LOADING FIX
// =====================
window.addEventListener("load", ()=>{
  const loader = document.getElementById("fb-loading");
  if(loader){
    setTimeout(()=>{
      loader.classList.add("done");
    },1000);
  }
});

// =====================
// COIN SYSTEM
// =====================
let userCoin = 100;

const COIN_RATE = 10; // 1000 = 10 coin

function idrToCoin(idr){
  return (idr / 1000) * COIN_RATE;
}

// =====================
// BUY SYSTEM
// =====================
function buyProduct(name, priceIDR){

  let priceCoin = idrToCoin(priceIDR);

  if(userCoin < priceCoin){
    alert("DOOM COIN tidak cukup!");
    return;
  }

  userCoin -= priceCoin;
  document.getElementById("coin").innerText = userCoin;

  addCustomerOrder(name);
}

// =====================
// ORDER SYSTEM
// =====================
function addCustomerOrder(productName){
  const container = document.getElementById("customer-order-list");

  const order = document.createElement("div");
  order.className = "order-item";

  order.innerHTML = `
    <div><b>${productName}</b></div>
    <div class="status-wait">⏳ Menunggu pesanan...</div>
  `;

  container.prepend(order);

  setTimeout(()=>{
    const status = order.querySelector(".status-wait");
    status.innerText = "📦 Pesanan telah dikirim!";
    status.classList.remove("status-wait");
    status.classList.add("status-done");
  },5000);
}