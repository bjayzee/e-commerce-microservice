const axios = require('axios');

const apiClient = {
    getCustomer: async (url, customerId) => {
        try {
            const response = await axios.get(`${url}/customers/${customerId}`);
            return response.data;
        } catch (error) {
            console.error('Customer validation error:', error.message);
            return null;
        }
    },
    getProduct: async (url, productId, quantity = 1) => {
        try {
            const response = await axios.get(`${url}/products/${productId}`);
            const product = response.data;

            if (product.stock < quantity) {
                console.error(`Insufficient stock for product ${productId}. Available: ${product.stock}, Requested: ${quantity}`);
                return null;
            }

            return product;
        } catch (error) {
            console.error('Product validation error:', error.message);
            return null;
        }
    },
    initiatePayment: async (url, payload) => {
        try {
            const response = await axios.post(`${url}/payments`, payload);
            return response.data;
        } catch (error) {
            console.error('Payment processing error:', error.message);
            throw error;
        }
    },
};

module.exports = apiClient;