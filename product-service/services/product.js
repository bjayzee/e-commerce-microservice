const Product = require('../models/Product');


// Create a new Product

async function createProduct(data) {
    const Product = new Product(data);
    return await Product.save();
}

 // Get a Product by id

async function getProductById(id) {
    return await Product.findById(id);
}


// Get all Products

async function getAllProducts() {
    return await Product.find();
}


// Update a Product by id

async function updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
}


// Delete a Product by id

async function deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
}

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
