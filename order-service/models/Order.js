const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    productId: { type: String, required: true },
    amount: { type: Number, required: true },
    orderStatus: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);