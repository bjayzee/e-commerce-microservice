require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
    await mongoose.connection.close();
    });

    describe('Customer Service', () => {
    it('should fetch customer', async () => {
        const res = await request(app).get('/customers');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        // expect(res.body[0].name).toBe('cust1'); 
    });
});
