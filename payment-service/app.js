const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/payments', paymentRoutes);

module.exports = app;