let filters = document.querySelectorAll(".filter");
let input = document.querySelector(".input");
let cardsContainer = document.querySelector(".cards-container");
let modalIcons = document.querySelectorAll(".modal i");
let modalImage = document.querySelector(".modal img");
let modalContainer = document.querySelector(".modal-container");
let navBarIcon = document.querySelector(".icons-nav i");
let showTotalCart = document.querySelector(".total-cart");
let purchaseList = document.querySelector(".purchases");
let totalItemsNumber = document.querySelector(".totalItemsNumber");
let totalPriceNav = document.querySelector(".totalPriceNav");
let totalPrice = document.querySelector(".price");

let cartItemPurchaseList =
  JSON.parse(localStorage.getItem("cartItemPurchaseList")) || [];
let totalCartPrice = [];

let data = [
  {
    image: "./img/cake-1.jpeg",
    title: "Cake Item",
    price: "$10",
    type: "cake",
    code: "1",
  },
  {
    image: "./img/cake-2.jpeg",
    title: "Cake Item",
    price: "$12",
    type: "cake",
    code: "2",
  },
  {
    image: "./img/cake-3.jpeg",
    title: "Cake Item",
    price: "$14",
    type: "cake",
    code: "3",
  },
  {
    image: "./img/cupcake-1.jpeg",
    title: "Cupcake Item",
    price: "$20",
    type: "cupcake",
    code: "4",
  },
  {
    image: "./img/cupcake-2.jpeg",
    title: "Cupcake Item",
    price: "$25",
    type: "cupcake",
    code: "5",
  },
  {
    image: "./img/cupcake-3.jpeg",
    title: "Cupcake Item",
    price: "$22",
    type: "cupcake",
    code: "6",
  },
  {
    image: "./img/sweets-3.jpeg",
    title: "Sweets Item",
    price: "$15",
    type: "sweet",
    code: "7",
  },
  {
    image: "./img/sweets-1.jpeg",
    title: "Sweets Item",
    price: "$12",
    type: "sweet",
    code: "8",
  },
  {
    image: "./img/doughnut-1.jpeg",
    title: "doughnut Item",
    price: "$12",
    type: "doughnut",
    code: "9",
  },
  {
    image: "./img/doughnut-2.jpeg",
    title: "doughnut Item",
    price: "$12",
    type: "doughnut",
    code: "10",
  },
  {
    image: "./img/doughnut-3.jpeg",
    title: "doughnut Item",
    price: "$12",
    type: "doughnut",
    code: "11",
  },
  {
    image: "./img/sweets-2.jpeg",
    title: "Sweets Item",
    price: "$12",
    type: "sweet",
    code: "12",
  },
];

class Card {
  constructor(image, title, price, type, code) {
    this.image = image;
    this.title = title;
    this.price = price;
    this.type = type;
    this.code = code;
  }
  creatcard() {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    let img = document.createElement("img");
    img.classList.add("img");
    img.src = this.image;
    let icon = document.createElement("i");
    icon.classList.add("fa-shopping-cart");
    icon.classList.add("fa");
    let info = document.createElement("div");
    info.classList.add("info");
    let name = document.createElement("div");
    name.classList.add("name");
    let price = document.createElement("div");
    price.classList.add("price");
    price.innerHTML = this.price;
    name.innerHTML = this.title;

    gridItem.setAttribute("code", this.code);

    gridItem.appendChild(img);
    gridItem.appendChild(icon);
    info.appendChild(name);
    info.appendChild(price);
    gridItem.appendChild(info);
    gridItem.classList.add(this.type);

    cardsContainer.appendChild(gridItem);
  }
}

data.forEach((e) => {
  let card = new Card(e.image, e.title, e.price, e.type, e.code);
  card.creatcard();
});

let cards = document.querySelectorAll(".grid-item");

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    cards.forEach((card) => {
      card.style.display = "flex";
    });
    if (filter.classList.contains("all")) {
      cards.forEach((card) => {
        card.style.display = "flex";
      });
    }
    filtering("doughnut", filter);
    filtering("sweet", filter);
    filtering("cupcake", filter);
    filtering("cake", filter);
  });
});

function filtering(type, filter) {
  if (filter.classList.contains(type)) {
    cards.forEach((card) => {
      if (!card.classList.contains(type)) {
        card.style.display = "none";
      }
    });
  }
}

input.addEventListener("input", (e) => {
  cards.forEach((card) => {
    if (
      card
        .querySelector(".name")
        .innerText.toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

let images = document.querySelectorAll(".img");
let imagesArray = Array.from(images);

images.forEach((image) => {
  image.addEventListener("click", () => {
    modalImage.src = image.src;
    modalContainer.style.display = "flex";
  });
});

window.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    modalContainer.style.display = "none";
  }
});

modalIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    let index = imagesArray.findIndex((image) => image.src == modalImage.src);
    if (e.target.id == "close-icon") {
      modalContainer.style.display = "none";
    } else if (e.target.id == "pre-btn") {
      index = index == 0 ? imagesArray.length - 1 : index;
      index--;
      modalImage.src = imagesArray[index].src;
    } else if (e.target.id == "next-btn") {
      index = index == imagesArray.length - 1 ? 0 : index;
      index++;
      modalImage.src = imagesArray[index].src;
    }
  });
});

navBarIcon.addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("show-nav");
});

function showTotalPurchases() {
  showTotalCart.classList.toggle("show-total-cart");
}

cardsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-shopping-cart")) {
    let purchaseInfo = data.find(
      (element) => element.code == e.target.parentNode.getAttribute("code")
    );
    cartItemPurchaseList.push(purchaseInfo);
    localStorage.setItem(
      "cartItemPurchaseList",
      JSON.stringify(cartItemPurchaseList)
    );

    creatCartItemPurchaseList(cartItemPurchaseList);
  }
});

if (cartItemPurchaseList.length != 0) {
  creatCartItemPurchaseList(cartItemPurchaseList);
}

function creatCartItemPurchaseList(cartItemPurchaseList) {
  purchaseList.innerHTML = "";
  totalCartPrice = [];
  cartItemPurchaseList.forEach((element) => {
    purchaseList.appendChild(createPurchaseItem(element));
    totalCartPrice.push(element.price.substring(1) * 1);
  });
  totalItemsNumber.innerText = totalCartPrice.length;
  totalPriceNav.innerText = totalPrice.innerText = totalCartPrice.reduce(
    (a, b) => a + b,
    0
  );
}

if (totalPriceNav.innerText == "") {
  totalPriceNav.innerText = totalPrice.innerText = 0;
  totalItemsNumber.innerText = 0;
}

purchaseList.addEventListener("click", (e) => {
  if (e.target.className == "fa fa-trash") {
    let index = Array.from(purchaseList.children).findIndex(
      (element) => element == e.target.parentNode
    );
    cartItemPurchaseList.splice(index, 1);
    localStorage.setItem(
      "cartItemPurchaseList",
      JSON.stringify(cartItemPurchaseList)
    );
    totalCartPrice.splice(index, 1);
    totalItemsNumber.innerText = totalCartPrice.length;
    totalPriceNav.innerText = totalPrice.innerText = totalCartPrice.reduce(
      (a, b) => a + b,
      0
    );
    e.target.parentNode.remove();
  }
});

function createPurchaseItem(item) {
  let li = document.createElement("li");
  let img = document.createElement("img");
  let cartInfo = document.createElement("div");
  let cartItem = document.createElement("div");
  let price = document.createElement("div");
  let dollor = document.createElement("span");
  let trashIcon = document.createElement("i");

  cartInfo.className = "cart-info";
  cartItem.className = "cart-item";
  price.className = "price";
  trashIcon.className = "fa fa-trash";

  img.src = item.image;
  cartItem.innerText = item.title;
  price.innerText = item.price.substring(1);
  dollor.innerText = " $";

  li.appendChild(img);
  price.appendChild(dollor);
  cartInfo.appendChild(cartItem);
  cartInfo.appendChild(price);
  li.appendChild(cartInfo);
  li.appendChild(trashIcon);

  return li;
}
