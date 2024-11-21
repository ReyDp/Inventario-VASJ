//import Auth from "./auth";

const UI = (() => {
    const renderTable = () => {
        const products = Products.getProducts();
        const inventoryTableBody = document.querySelector('#inventory-table tbody');
        if (!inventoryTableBody) return;

        inventoryTableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.quantity}</td>
                <td>${product.price !== null ? `$${product.price.toFixed(2)}` : 'N/A'}</td>
                <td>${product.lowStockLimit}</td>
                <td class="actions">
                    <button class="delete" data-index="${index}">Eliminar</button>
                </td>
            `;

            inventoryTableBody.appendChild(row);
        });

        // Delegar el evento de clic a los botones de "Editar" y "Eliminar"
        inventoryTableBody.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('delete')) {
                const index = target.getAttribute('data-index');
                Products.deleteProduct(index); // Eliminar el producto
                UI.renderTable(); // Volver a renderizar la tabla después de eliminar
            }
        });
    };

    const loadLowStockProducts = () => {
        const lowStockList = document.getElementById('low-stock-list');
        lowStockList.innerHTML = '';

        const lowStockProducts = Products.getProducts().filter(product => product.quantity <= product.lowStockLimit);

        if (lowStockProducts.length > 0) {
            lowStockProducts.forEach(product => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>${product.name}</span> - Stock: ${product.quantity}`;
                lowStockList.appendChild(listItem);
            });
        } else {
            lowStockList.innerHTML = '<li>No hay productos con bajo stock.</li>';
        }
    };

    const resetForm = () => {
        document.getElementById('inventory-form').reset();
    };

    const populateForm = (product, index) => {
        const form = document.getElementById('inventory-form');
        form.elements['name'].value = product.name;
        form.elements['description'].value = product.description;
        form.elements['quantity'].value = product.quantity;
        form.elements['price'].value = product.price || '';
        form.elements['lowStockLimit'].value = product.lowStockLimit;
        form.elements['productIndex'].value = index; // Campo oculto para rastrear el índice
    };

    return {
        renderTable,
        loadLowStockProducts,
        resetForm,
        populateForm
    };
})();