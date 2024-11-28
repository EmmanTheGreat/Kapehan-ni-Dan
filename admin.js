const productTable = document.getElementById("productTable").querySelector("tbody");
const totalProductsElement = document.getElementById("total-products");
const totalCustomersElement = document.getElementById("total-customers"); // Add reference to the customers count element
let currentEditRow = null;

// Function to update the total number of products
function updateProductCount() {
    totalProductsElement.textContent = productTable.rows.length;
}

// Function to update the total number of customers (including admins)
function updateUserCount() {
    const allUserData = Object.keys(localStorage); // Get all keys in localStorage
    let userCount = 0;

    allUserData.forEach(email => {
        const userData = JSON.parse(localStorage.getItem(email));

        // Debugging: log the userData for each entry
        console.log('User Data:', userData);

        // If userData exists, count it (admin or customer)
        if (userData) {
            userCount++;
        }
    });

    // Debugging: log the userCount
    console.log('Total Users:', userCount);

    totalCustomersElement.textContent = userCount; // Update the users count in the DOM
}

document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").files[0];

    let imageURL = "";
    if (productImage) {
        imageURL = URL.createObjectURL(productImage);
    }

    if (currentEditRow) {
        // Update the existing row
        currentEditRow.cells[1].querySelector("img").src = imageURL || currentEditRow.cells[1].querySelector("img").src;
        currentEditRow.cells[2].textContent = productName;
        currentEditRow.cells[3].textContent = productPrice;

        alert("Product successfully updated!");
    } else {
        // Add a new row
        const newRow = productTable.insertRow();
        newRow.innerHTML = `
            <th scope="row">${productTable.rows.length}</th>
            <td><img src="${imageURL}" alt="Product Image" class="img-thumbnail" style="width: 50px; height: 50px;"></td>
            <td>${productName}</td>
            <td>₱${productPrice}</td>
            <td>
                <button class="btn btn-warning btn-sm editBtn" data-bs-toggle="modal" data-bs-target="#productModal">Edit</button>
                <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
            </td>
        `;

        // Add event listeners to new buttons
        newRow.querySelector(".editBtn").addEventListener("click", editProduct);
        newRow.querySelector(".deleteBtn").addEventListener("click", deleteProduct);

        alert("Product successfully added!");

        // Update product count
        updateProductCount();
    }

    // Reset the form and close the modal
    this.reset();
    currentEditRow = null;
    const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    modal.hide();
});

function editProduct() {
    currentEditRow = this.closest("tr");
    document.getElementById("productName").value = currentEditRow.cells[2].textContent;
    document.getElementById("productPrice").value = currentEditRow.cells[3].textContent;
    document.getElementById("productImage").value = ""; // Clear the file input
     
}


function deleteProduct() {
    // Ask for confirmation before deleting
    const isConfirmed = confirm("Are you sure you want to delete this product?");

    if (isConfirmed) {
        const row = this.closest("tr");
        row.remove();

        // Update row numbers after deletion
        [...productTable.rows].forEach((row, index) => {
            row.cells[0].textContent = index + 1; // Update row numbers
        });

        // Update product count
        updateProductCount();

        // Show success alert after deletion
        alert("Product successfully deleted!");
    } else {
        // If the user cancels, do nothing
        console.log("Product deletion canceled.");
    }
}

// Function to update the total number of orders
function updateOrderCount() {
    // Retrieve the orders array from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Get the total number of orders by counting the length of the orders array
    const orderCount = orders.length;

    // Update the orders count in the DOM element with id "total-orders"
    document.getElementById("total-orders").textContent = orderCount;
}

// Call the function to update the order count when the page loads
document.addEventListener("DOMContentLoaded", updateOrderCount);


// Attach event listeners to initial buttons
document.querySelectorAll(".editBtn").forEach(btn => btn.addEventListener("click", editProduct));
document.querySelectorAll(".deleteBtn").forEach(btn => btn.addEventListener("click", deleteProduct));

// Initialize product count
updateProductCount();

// Initialize user count (includes both customers and admins)
updateUserCount();


// Function to update the total sales (sum of all order prices)
function updateTotalSales() {
    // Retrieve total sales from localStorage
    const totalSales = JSON.parse(localStorage.getItem('totalSales')) || {}; // Use localStorage data if available

    // Calculate total sales by summing up all the values in the totalSales object
    let salesAmount = 0;

    // Iterate through the object and sum up the sales
    for (let productId in totalSales) {
        if (totalSales.hasOwnProperty(productId)) {
            salesAmount += totalSales[productId];
        }
    }

    // Update the total sales count in the DOM element with id "total-sales"
    document.getElementById("total-sales").textContent = `₱${salesAmount.toLocaleString()}`;
}

// Call the function to update the total sales when the page loads
document.addEventListener("DOMContentLoaded", updateTotalSales);


// Call the function to update the total sales when the page loads
document.addEventListener("DOMContentLoaded", updateTotalSales);



// Call the function to update the total sales when the page loads
document.addEventListener("DOMContentLoaded", updateTotalSales);

// Function to update or add a product in localStorage
function saveProductToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to load products from localStorage
function loadProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").files[0];

    let imageURL = "";
    if (productImage) {
        imageURL = URL.createObjectURL(productImage);
    }

    // Get existing products from localStorage
    let products = loadProductsFromLocalStorage();

    if (currentEditRow) {
        // Update existing product
        const productId = currentEditRow.dataset.productId;
        const product = products.find(p => p.id === productId);
        product.name = productName;
        product.price = productPrice;
        product.image = imageURL || product.image;
    } else {
        // Add new product
        const newProduct = {
            id: Date.now().toString(), // Generate unique product ID based on timestamp
            name: productName,
            price: productPrice,
            image: imageURL,
        };
        products.push(newProduct);
    }

    // Save updated product list to localStorage
    saveProductToLocalStorage(products);

    // Update the product list table
    updateProductTable(products);
    
    // Reset the form and close modal
    this.reset();
    currentEditRow = null;
    const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    modal.hide();
});

const storedData = localStorage.getItem('admin1@gmail.com');
        
        if (storedData) {
            const adminData = JSON.parse(storedData);
            
            // Replace the content of the admin element with the name
            const adminElement = document.getElementById('admin');
            adminElement.textContent = adminData.name || "Admin"; // Default to 'Admin' if name is not available
        } else {
            console.warn("No admin data found in local storage.");
        }

// Initialize product list on page load
document.addEventListener("DOMContentLoaded", function () {
    const products = loadProductsFromLocalStorage();
    updateProductTable(products);
    updateProductCount();
});
