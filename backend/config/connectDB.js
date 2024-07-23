require('dotenv').config();
const URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connectDB = async() =>{
  try {
    await mongoose.connect(URI);
    console.log('connected to MongoDB database!')
  } catch (er) {
    console.error(`Error connecting to database: ${er}`)
  }
}

module.exports = connectDB;