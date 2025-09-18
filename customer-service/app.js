const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customer');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/customers', customerRoutes);

module.exports = app;