const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/order');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/orders', orderRoutes);

module.exports = app;