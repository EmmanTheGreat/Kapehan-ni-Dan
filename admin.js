
    const productTable = document.getElementById("productTable").querySelector("tbody");
    const totalProductsElement = document.getElementById("total-products");
    let currentEditRow = null;

    // Function to update the total number of products
    function updateProductCount() {
        totalProductsElement.textContent = productTable.rows.length;
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
        } else {
            // Add a new row
            const newRow = productTable.insertRow();
            newRow.innerHTML = `
                <th scope="row">${productTable.rows.length}</th>
                <td><img src="${imageURL}" alt="Product Image" class="img-thumbnail" style="width: 50px; height: 50px;"></td>
                <td>${productName}</td>
                <td>${productPrice}</td>
                <td>
                    <button class="btn btn-warning btn-sm editBtn" data-bs-toggle="modal" data-bs-target="#productModal">Edit</button>
                    <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
                </td>
            `;

            // Add event listeners to new buttons
            newRow.querySelector(".editBtn").addEventListener("click", editProduct);
            newRow.querySelector(".deleteBtn").addEventListener("click", deleteProduct);

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
        const row = this.closest("tr");
        row.remove();
        // Update row numbers
        [...productTable.rows].forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
        // Update product count
        updateProductCount();
    }

    // Attach event listeners to initial buttons
    document.querySelectorAll(".editBtn").forEach(btn => btn.addEventListener("click", editProduct));
    document.querySelectorAll(".deleteBtn").forEach(btn => btn.addEventListener("click", deleteProduct));

    // Initialize product count
    updateProductCount();

