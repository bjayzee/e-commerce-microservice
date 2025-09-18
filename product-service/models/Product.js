const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, default: 10 }
    },
    { timestamps: true }
);

module.exports = model('Product', productSchema);
