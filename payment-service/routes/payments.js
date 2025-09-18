const express = require('express');
const { publishTransaction } = require('../utils/rabbitmq');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');


router.post('/', async (req, res) => {
    const { customerId, orderId, productId, amount } = req.body;
    if (!customerId || !orderId || !productId || amount === undefined) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Missing required fields' });
    }

    try {
        const orderStatus = 'paid';

        // Publish to queue for async saving
        await publishTransaction({ customerId, orderId, productId, amount });

        res.status(StatusCodes.OK).json({ customerId, orderId, productId, orderStatus });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

module.exports = router;