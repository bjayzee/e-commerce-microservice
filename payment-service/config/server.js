require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../models/Transactions');
const { connectRabbitMQ, consumeTransactions } = require('../utils/rabbitmq');


const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('MongoDB connected');      
    });
    await connectRabbitMQ(process.env.RABBITMQ_URL);
    await consumeTransactions(Transaction);
}catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;