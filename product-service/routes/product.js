const express = require('express');
const {status} = require('http-status');
const mongoose = require('mongoose');


const {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require('../services/product');

const router = express.Router();

// Create Product
router.post('/', async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(status.CREATED).json(product);
    } catch (error) {
        res.status(status.BAD_REQUEST).json({ error: error.message });
    }
});

// Get all Products
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Get Product by _id
router.get('/:id', async (req, res) => {
    console.log("got here")
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(status.BAD_REQUEST).json({ error: 'Invalid ID format' });
        }

        const product = await getProductById(req.params.id);
        if (!product) return res.status(status.NOT_FOUND).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Update Product by _id
router.patch('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(status.BAD_REQUEST).json({ error: 'Invalid ID format' });
        }

        const product = await updateProduct(req.params.id, req.body);
        if (!product) return res.status(status.NOT_FOUND).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(status.BAD_REQUEST).json({ error: error.message });
    }
});

// Delete Product by _id
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(status.BAD_REQUEST).json({ error: 'Invalid ID format' });
        }

        const product = await deleteProduct(req.params.id);
        if (!product) return res.status(status.NOT_FOUND).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

module.exports = router;
