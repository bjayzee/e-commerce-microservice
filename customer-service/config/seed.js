const Customer = require('../models/Customer');

const seedData = [
    { name: 'John Doe', email: 'john@example.com' },
    {name: 'Gabriel Doe', email: 'gab@example.com' },
    { name: 'John Mark', email: 'mark@example.com' },
    { name: 'Debby Alice', email: 'debby@example.com' },
    { name: 'Mark Angel', email: 'angel@example.com' }
];

const seedCustomers = async () => {
    try {
        const count = await Customer.countDocuments();
        if (count === 0) {
        await Customer.insertMany(seedData);
        console.log('Seeded customers');
        } else {
        console.log('Customers already seeded');
        }
    } catch (err) {
        console.error('Seeding error:', err.message);
    }
};

module.exports = seedCustomers;
