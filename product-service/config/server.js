require('dotenv').config();
const mongoose = require('mongoose');
const seedProduct = require('./seed');

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('MongoDB connected');      
    });
    await seedProduct();
}catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;