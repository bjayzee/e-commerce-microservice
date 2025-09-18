const Product = require('../models/Product');

const seedData = [
    { name: 'iPhone 14', price: 999, category: 'Electronics' },
    { name: 'Samsung Galaxy S23', price: 899, category: 'Electronics' },
    { name: 'MacBook Pro', price: 1999, category: 'Computers' },
    { name: 'Sony WH-1000XM5', price: 349, category: 'Audio' },
    { name: 'Apple Watch Series 8', price: 399, category: 'Wearables' }
];

const seedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(seedData);
            console.log('Seeded products');
        } else {
            console.log('Products already seeded');
        }
    } catch (err) {
        console.error('Seeding error:', err.message);
    }
};

module.exports = seedProducts;
