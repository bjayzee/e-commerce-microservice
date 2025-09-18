const Customer = require('../models/Customer');


// Create a new customer

async function createCustomer(data) {
    const customer = new Customer(data);
    return await customer.save();
}

 // Get a customer by MongoDB _id

async function getCustomerById(id) {
    return await Customer.findById(id);
}


// Get all customers

async function getAllCustomers() {
    return await Customer.find();
}


// Update a customer by MongoDB _id

async function updateCustomer(id, data) {
    return await Customer.findByIdAndUpdate(id, data, { new: true });
}


// Delete a customer by MongoDB _id

async function deleteCustomer(id) {
    return await Customer.findByIdAndDelete(id);
}

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
};
