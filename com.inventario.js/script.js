// Proveedores disponibles
const providers = ["Proveedor A", "Proveedor B", "Proveedor C", "Proveedor D"];

// Cargar proveedores en el desplegable
const loadProviders = () => {
    const providerSelect = document.getElementById('product-provider');
    providers.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider;
        option.textContent = provider;
        providerSelect.appendChild(option);
    });
};

// Inicializar la navegación al cargar la ventana
window.onload = () => {
    Navigation.initializeNavigation();
    loadProviders(); // Cargar proveedores al iniciar

    // Renderizar la tabla de productos si la sección "list-products" está visible
    const currentSection = document.querySelector('.section:not([style*="display: none"])');
    if (currentSection.id === 'list-products') {
        UI.renderTable();
    }

    // Renderizar la lista de bajo stock si la sección "home" está visible
    if (currentSection.id === 'home') {
        UI.loadLowStockProducts();
    }
};

// Manejar el envío del formulario para agregar productos
document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById('product-name').value.trim();
    const description = document.getElementById('product-description').value.trim();
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const unit = document.getElementById('product-unit').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const lowStockLimit = parseInt(document.getElementById('product-lowstock').value);
    const dateOn = document.getElementById('product-date-on').value;
    const dateOff = document.getElementById('product-date-off').value;
    const provider = document.getElementById('product-provider').value.trim();

    // Validar campos
    if (name === '' || isNaN(quantity) || quantity < 0 || isNaN(lowStockLimit) || lowStockLimit < 1 || price < 0 || unit === '' || dateOn === '' || dateOff === '' || provider === '') {
        alert('Por favor, completa todos los campos obligatorios correctamente.');
        return;
    }

    // Crear nuevo producto
    const newProduct = {
        name,
        description,
        quantity,
        unit,
        price: isNaN(price) ? null : price,
        lowStockLimit,
        dateOn,
        dateOff,
        provider
    };


// Enviar datos al servidor
fetch('http://localhost:3000/api/productos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error al agregar el producto');
    }
    return response.json();
})
.then(data => {
    console.log('Producto agregado:', data);
    UI.renderTable(); // Actualiza la tabla
    UI.resetForm(); // Resetea el formulario
    alert('Producto agregado exitosamente.');
})
.catch(error => {
    console.error('Error:', error);
    alert('Hubo un problema al agregar el producto.');
});


    // Añadir al array y guardar
    Products.addProduct(newProduct);

    // Renderizar la tabla de productos si la sección está visible
    const currentSection = document.querySelector('.section:not([style*="display: none"])');
    if (currentSection.id === 'list-products') {
        UI.renderTable();
    }

    // Actualizar la lista de bajo stock si la sección está visible
    if (currentSection.id === 'home') {
        UI.loadLowStockProducts();
    }

    // Resetear el formulario
    UI.resetForm();

    alert('Producto agregado exitosamente.');
});
