let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'Matcha', image: 'matcha.jpg', price: 120 },
    { id: 2, name: 'Iced Latte', image: 'iced latte.jpg', price: 125 },
    { id: 3, name: 'Frappe', image: 'frappe.jpg', price: 130 },
    { id: 4, name: 'Coffee Jelly', image: 'jelly.jpg', price: 135 },
    { id: 5, name: 'Coffee Shade', image: 'shade.jpg', price: 120 },
    { id: 6, name: 'Coffee Caramel', image: 'caramel.jpg', price: 125 },
    { id: 7, name: 'Pumpkin Coffee', image: 'pumpkin.jpg', price: 135 },
    { id: 8, name: 'Choco Coffee', image: 'choco.jpg', price: 140 },
];

let listCards = []; // Array to store cart items

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="assets/img/coffee/${value.image}" alt="${value.name}" />
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onClick="addToCard(${key})">Add to Cart</button>
        `;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (!listCards[key]) {
        // Add the product to the cart for the first time
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        // Increment the quantity if already in the cart
        listCards[key].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = ''; // Clear the cart display
    let totalPrice = 0;
    let count = 0;

    listCards.forEach((value, key) => {
        if (value) {
            // Calculate totals
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            // Render cart item
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="assets/img/coffee/${value.image}" alt="${value.name}" /></div>
                <div>${value.name}</div>
                <div>${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <span>${value.quantity}</span>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    // Update total and quantity in the UI
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}


function changeQuantity(key,quantity){
    if(quantity==0){
        delete listCards[key];
    }
    else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity + products[key].price - quantity;
    }
    reloadCard();
}
