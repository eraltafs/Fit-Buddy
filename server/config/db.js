const mongoose = require("mongoose");
require("dotenv").config();

// Define a function to establish a connection to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri); // Connect to the MongoDB database using the URI from environment variables
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = { connectToDatabase };
