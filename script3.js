document.addEventListener("DOMContentLoaded", () => {
    const openShopping = document.querySelector('.shopping');
    const closeShopping = document.querySelector('.closeShopping');
    const listCard = document.querySelector('.listCard');
    const body = document.querySelector('body');
    const totalElement = document.querySelector('.total');
    const quantityElement = document.querySelector('.quantity');
    const getButtons = document.querySelectorAll('.btn-get');
    const receiptModal = document.createElement('div');
    
    //start here
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage or initialize an empty array
    let totalSales = {}; // Object to store total sales for each item by its ID

    openShopping.addEventListener('click', () => {
        body.classList.add('active');
    });

    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });

    const products = [
        { id: 1, name: 'Matcha', image: 'assets/img/coffee/matcha.jpg', price: 120 },
        { id: 2, name: 'Iced Latte', image: 'assets/img/coffee/iced latte.jpg', price: 125 },
        { id: 3, name: 'Frappe', image: 'assets/img/coffee/frappe.jpg', price: 130 },
        { id: 4, name: 'Coffee Jelly', image: 'assets/img/coffee/jelly.jpg', price: 135 },
        { id: 5, name: 'Coffee Shade', image: 'assets/img/coffee/shade.jpg', price: 120 },
        { id: 6, name: 'Coffee Caramel', image: 'assets/img/coffee/caramel.jpg', price: 125 },
        { id: 7, name: 'Pumpkin Coffee', image: 'assets/img/coffee/pumpkin.jpg', price: 135 },
        { id: 8, name: 'Choco Coffee', image: 'assets/img/coffee/choco.jpg', price: 140 },
    ];

    // Function to update localStorage with the latest cart and totalSales
    const saveCartToLocalStorage = () => {
        const cartData = {
            version: (JSON.parse(localStorage.getItem('cartVersion')) || 0) + 1, // Increment version number
            cart: cart.map(item => ({
                ...item,
                sales: item.price * item.quantity // Add sales key to each item
            })),
            totalSales // Store the totalSales object in localStorage
        };
        localStorage.setItem('cart', JSON.stringify(cartData.cart));
        localStorage.setItem('cartVersion', cartData.version); // Save version
        localStorage.setItem('totalSales', JSON.stringify(cartData.totalSales)); // Save totalSales
    };

    // Function to add product to the cart
    const addToCart = (productId) => {
        const product = products.find(item => item.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Update totalSales for the product
        totalSales[productId] = product.price * existingItem?.quantity || product.price;

        updateCart();
        saveCartToLocalStorage(); // Save the updated cart and totalSales
    };

    // Function to update the cart display
    const updateCart = () => {
        listCard.innerHTML = '';
        let total = 0;
        let quantity = 0;

        cart.forEach(item => {
            // Calculate the sales value for each item
            item.sales = item.price * item.quantity;
            total += item.sales;
            quantity += item.quantity;

            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div style="display: inline-block; margin-right: 10px; vertical-align: middle;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-bottom: 20px">
                </div>
                <div style="display: inline-block; margin-right: 10px; vertical-align: middle;">${item.name}</div>
                <div style="display: inline-block; margin-right: 10px; vertical-align: middle;">₱${item.price.toLocaleString()}</div>
                <div style="display: inline-block; vertical-align: middle;">
                    <div style="display: flex; justify-content: space-evenly; align-items: center; gap: 20px;">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div style="display: inline-block; vertical-align: middle;">₱${item.sales.toLocaleString()}</div> <!-- Display sales -->
            `;
            listCard.appendChild(cartItem);
        });

        totalElement.textContent = `Total: ₱${total.toLocaleString()}`;
        quantityElement.textContent = quantity;

        if (cart.length > 0) {
            const buyButton = document.createElement('div');
            buyButton.classList.add('buy-button');
            buyButton.innerHTML = `
                <div style="text-align: center; width: 100%;">
                    <button class="btn btn-success" style="width: 100%; padding: 20px; font-size: 24px; border-radius: 10px;" onclick="checkoutCart()"><b>Buy</b></button>
                </div>
            `;
            listCard.appendChild(buyButton);
        }

        saveCartToLocalStorage(); // Save the updated cart and totalSales
    };

    // Change quantity function
    window.changeQuantity = (productId, delta) => {
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id !== productId);
            }

            // Update totalSales for the product
            totalSales[productId] = item.price * item.quantity;

            updateCart();
        }
    };

    // Generate order ID
    const generateOrderId = () => {
        return `ORD-${Date.now()}`;
    };

    // Function to checkout the cart
    window.checkoutCart = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const orderId = generateOrderId();
        const orderDate = new Date().toISOString();

        const order = {
            orderId,
            date: orderDate,
            products: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                sales: item.sales // Store sales in order
            }))
        };

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        cart = []; // Clear the cart after purchase
        updateCart(); // Update the display
    };

    // Initialize the cart and update the display
    updateCart();

    // Add event listeners for "Get" buttons
    getButtons.forEach((button, index) => {
        button.addEventListener('click', () => addToCart(products[index].id));
    });
    //end here
});

// Get the products from local storage
const products = JSON.parse(localStorage.getItem('products'));

// Check if products exist
if (products && Array.isArray(products)) {
    // Iterate through the products array
    products.forEach(product => {
        // Set default values if the fields are empty
        const name = product.name || 'Unnamed Product';
        const price = product.price || 'N/A';
        const image = product.image || 'assets/img/default.jpg';  // Default image if no image is provided

        // Create the HTML content for each product
        const productHTML = `
            <div class="card border-0">
                <img src="${image}" class="card-img-top" alt="${name}">
                <div class="card-body text-start">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">₱${price}</p>
                    <div class="row">
                        <div class="col-6 align-items-center">
                            <button class="btn btn-outline-dark btn-view">View</button>
                        </div>
                        <div class="col-6 align-items-center">
                            <button class="btn btn-dark btn-get">Get</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the product HTML to the desired container (example: a div with id 'product-container')
        document.getElementById('product-container').innerHTML += productHTML;
    });
} else {
    console.log('No products found in local storage');
}

  

