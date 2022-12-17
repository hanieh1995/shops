let filters = document.querySelectorAll(".filter");
let input = document.querySelector(".input");
let cardsContainer = document.querySelector(".cards-container");


let data = [
    { image: "./img/cake-1.jpeg", title: "Cake Item", price: "$10", type: "cake" },
    { image: "./img/cake-2.jpeg", title: "Cake Item", price: "$12", type: "cake" },
    { image: "./img/cake-3.jpeg", title: "Cake Item", price: "$14", type: "cake" },
    { image: "./img/cupcake-1.jpeg", title: "Cupcake Item", price: "$20", type: "cupcake" },
    { image: "./img/cupcake-2.jpeg", title: "Cupcake Item", price: "$25", type: "cupcake" },
    { image: "./img/cupcake-3.jpeg", title: "Cupcake Item", price: "$22", type: "cupcake" },
    { image: "./img/sweets-3.jpeg", title: "Sweets Item", price: "$15", type: "sweet" },
    { image: "./img/sweets-1.jpeg", title: "Sweets Item", price: "$12", type: "sweet" },
    { image: "./img/doughnut-1.jpeg", title: "doughnut Item", price: "$12", type: "doughnut" },
    { image: "./img/doughnut-2.jpeg", title: "doughnut Item", price: "$12", type: "doughnut" },
    { image: "./img/doughnut-3.jpeg", title: "doughnut Item", price: "$12", type: "doughnut" },
    { image: "./img/sweets-2.jpeg", title: "Sweets Item", price: "$12", type: "sweet" },
]

class Card {
    constructor(image, title, price, type) {
        this.image = image;
        this.title = title;
        this.price = price;
        this.type = type;
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

        gridItem.appendChild(img);
        gridItem.appendChild(icon);
        info.appendChild(name);
        info.appendChild(price);
        gridItem.appendChild(info);
        gridItem.classList.add(this.type)

        cardsContainer.appendChild(gridItem);
    }
}


data.forEach(e => {
    let card = new Card(e.image, e.title, e.price, e.type);
    card.creatcard();
})

let cards = document.querySelectorAll(".grid-item");

filters.forEach(filter => {
    filter.addEventListener("click", (e) => {
        cards.forEach(card => {
            card.style.display = "flex";
        })
        if (filter.classList.contains("all")) {
            cards.forEach(card => {
                card.style.display = "flex";
            })
        } 
        filtering("doughnut",filter);
        filtering("sweet",filter);
        filtering("cupcake",filter);
        filtering("cake",filter);
    })
})

function filtering(type,filter){
     if (filter.classList.contains(type)) {
        cards.forEach(card => {
            if (!card.classList.contains(type)) {
                card.style.display = "none"
            }
        })
    }
}

input.addEventListener("input", e => {
    cards.forEach(card => {
        if (card.querySelector(".name").innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
            card.style.display = "flex"
        } else {
            card.style.display = "none"
        }

    })
})
