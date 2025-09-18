const express = require('express');
const {status} = require('http-status');
const mongoose = require('mongoose');


const {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
} = require('../services/customer');

const router = express.Router();

// Create customer
router.post('/', async (req, res) => {
    try {
        const customer = await createCustomer(req.body);
        res.status(status.CREATED).json(customer);
    } catch (error) {
        res.status(status.BAD_REQUEST).json({ error: error.message });
    }
});

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.json(customers);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Get customer by _id
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(status.BAD_REQUEST).json({ error: 'Invalid ID format' });
        }

        const customer = await getCustomerById(req.params.id);
        if (!customer) return res.status(status.NOT_FOUND).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Update customer by _id
router.patch('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(status.BAD_REQUEST).json({ error: 'Invalid ID format' });
        }

        const customer = await updateCustomer(req.params.id, req.body);
        if (!customer) return res.status(status.NOT_FOUND).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(status.BAD_REQUEST).json({ error: error.message });
    }
});

// Delete customer by _id
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(status.BAD_REQUEST).json({ error: 'Invalid ID format' });
        }

        const customer = await deleteCustomer(req.params.id);
        if (!customer) return res.status(status.NOT_FOUND).json({ error: 'Customer not found' });
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

module.exports = router;
