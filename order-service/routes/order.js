require('dotenv').config();
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const apiClient = require('../utils/apiClient');

const router = express.Router();
const { CUSTOMER_SERVICE_URL, PRODUCT_SERVICE_URL, PAYMENT_SERVICE_URL } = process.env;

// url validation
if (!CUSTOMER_SERVICE_URL || !PRODUCT_SERVICE_URL || !PAYMENT_SERVICE_URL) {
    console.error('Missing required environment variables');
    process.exit(1);
}

// Create order
router.post('/', async (req, res) => {
    try {
        const { customerId, productId, quantity = 1, amount } = req.body;

        // Validate input types and values
        if (!customerId || !productId || !amount) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Missing required fields: customerId, productId, and amount are required',
            });
        }
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Quantity must be a positive integer',
            });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Amount must be a positive number',
            });
        }

        // Validate customer exists
        const customer = await apiClient.getCustomer(CUSTOMER_SERVICE_URL, customerId);
        if (!customer) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid customer ID' });
        }

        // Validate product exists
        const product = await apiClient.getProduct(PRODUCT_SERVICE_URL, productId, quantity);
        if (!product) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Product does not exist',
            });
        }

        // Check for existing order
        const existingOrder = await Order.findOne({ customerId });
        if (existingOrder) {
            return res.status(StatusCodes.CONFLICT).json({
                error: 'Order already exists for this customer',
            });
        }

        // Create order with pending status
        const orderData = {
            customerId,
            productId,
            quantity,
            amount,
            orderStatus: 'pending',
        };

        const order = new Order(orderData);
        const savedOrder = await order.save();

        // Send payment request asynchronously
        apiClient.initiatePayment(PAYMENT_SERVICE_URL, {
            customerId,
            orderId: savedOrder._id,
            amount,
            productId
        }).catch(async (error) => {
            console.error('Payment processing error:', error.message);
            await Order.findByIdAndUpdate(savedOrder._id, { orderStatus: 'failed' });
        });

        // Return order response
        const response = {
            customerId: savedOrder.customerId,
            orderId: savedOrder._id,
            productId: savedOrder.productId,
            orderStatus: savedOrder.orderStatus,
            amount: savedOrder.amount,
            quantity: savedOrder.quantity,
            createdAt: savedOrder.createdAt,
        };

        return res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
        console.error('Order creation error:', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create order' });
    }
});

module.exports = router;