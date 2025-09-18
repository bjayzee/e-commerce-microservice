const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
    }, 
    { timestamps: true }
);

module.exports = model('Customer', customerSchema);
