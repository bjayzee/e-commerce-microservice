const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/products', productRoutes);

module.exports = app;