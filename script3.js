document.addEventListener("DOMContentLoaded", () => {
    const openShopping = document.querySelector('.shopping');
    const closeShopping = document.querySelector('.closeShopping');
    const listCard = document.querySelector('.listCard');
    const body = document.querySelector('body');
    const totalElement = document.querySelector('.total');
    const quantityElement = document.querySelector('.quantity');
    const getButtons = document.querySelectorAll('.btn-get');
    const receiptModal = document.createElement('div');

    let cart = []; // To hold cart items

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

    const addToCart = (productId) => {
        const product = products.find(item => item.id === productId);

        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1; 
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    };

    const updateCart = () => {
        listCard.innerHTML = '';
        let total = 0;
        let quantity = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
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
    <button class="btn btn-success" style="width: 100%;  padding: 20px; font-size: 24px; border-radius: 10px;" onclick="checkoutCart()"><b>Buy</b></button>
</div>


            `;
            listCard.appendChild(buyButton);
        }
    };

    window.changeQuantity = (productId, delta) => {
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id !== productId);
            }
            updateCart();
        }
    };

    const generateOrderId = () => {
        return `ORD-${Date.now()}`;
    };

    window.checkoutCart = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const orderId = generateOrderId();
        let receipt = `Receipt:\n\nOrder ID: ${orderId}\n\n`;
        let total = 0;

        cart.forEach(item => {
            receipt += `${item.quantity} x ${item.name} - ₱${(item.price * item.quantity).toLocaleString()}\n`;
            total += item.price * item.quantity;
        });

        receipt += `\nTotal: ₱${total.toLocaleString()}\n\nThank you for your purchase!`;

        showReceipt(receipt, orderId);

        // Clear cart
        cart = [];
        updateCart();
    };

    const downloadReceipt = (receipt, orderId) => {
        const blob = new Blob([receipt], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Receipt-${orderId}.txt`;
        link.click();
    };

    const showReceipt = (receipt, orderId) => {
        receiptModal.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 9999;">
                <h4>Order</h4>
                <pre style="white-space: pre-wrap; word-wrap: break-word;">${receipt}</pre>
                <button class="btn btn-success" onclick="downloadReceipt('${receipt.replace(/'/g, "\\'")}', '${orderId}')">Download Receipt</button>
                <button class="btn btn-secondary" onclick="closeReceipt()">Close</button>
            </div>
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9998;" onclick="closeReceipt()"></div>
        `;
        document.body.appendChild(receiptModal);
    };

    window.closeReceipt = () => {
        receiptModal.innerHTML = '';
    };

    getButtons.forEach((button, index) => {
        button.addEventListener('click', () => addToCart(products[index].id));
    });
});



