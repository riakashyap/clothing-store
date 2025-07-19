let shop = document.getElementById('shop');

const shopItemsData = [
  {
    id: 1,
    name: "Casual Shirt",
    price: 45,
    desc: "100% Linen. Great for Summer",
    img: "images/img-1.jpg"
  },
  {
    id: 2,
    name: "Formal Shirt",
    price: 55,
    desc: "Satin Material. Best Suited for the Office",
    img: "images/img-2.jpg"
  },
  {
    id: 3,
    name: "T-Shirt",
    price: 25,
    desc: "100% Cotton. Comfort first for Daily wear",
    img: "images/img-3.jpg"
  },
  {
    id: 4,
    name: "Blazer",
    price: 65,
    desc: "For buisness and client meetings",
    img: "images/img-4.jpg"
  }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x;
    let search = basket.find((x) => x.id === id) || [];
    return `
      <div class="item" id="product-id-${id}">
        <img width="220" height="320px" src="${img}" alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h3>$${price}</h3>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join(""); 
};

generateShop();

let increment = (id)=> {
  let search = basket.find((x)=>x.id === id);
  if(search == undefined){
    basket.push({
      id: id,
      item: 1
    })
  }
  else{
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
}

let decrement = (id)=> {
  let search = basket.find((x)=>x.id === id);
  if(search == undefined) return;
  else if(search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
}

let update = (id)=> {
  let search = basket.find((x)=>x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
}

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();