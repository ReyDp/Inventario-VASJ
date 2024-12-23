const Products = (() => {
    let products = Storage.loadProducts();

    const addProduct = (product) => {
        products.push(product);
        Storage.saveProducts(products);
    };

    const deleteProduct = (index) => {
        products.splice(index, 1);
        Storage.saveProducts(products);
    };

    const editProduct = (index, updatedProduct) => {
        products[index] = updatedProduct;
        Storage.saveProducts(products);
    };

    const getProducts = () => products;

    const getProductByIndex = (index) => products[index];

    return {
        addProduct,
        deleteProduct,
        editProduct,
        getProducts,
        getProductByIndex
    };
})();
