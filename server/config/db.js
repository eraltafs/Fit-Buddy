const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { connection };
