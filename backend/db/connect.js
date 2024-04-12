/*const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`);
  }
};

module.exports = connectDB;*/

//import { connect } from 'mongoose';

const mongoose = require("mongoose");
//import { connect } from 'mongoose';
const mongoURI =
  "mongodb://0.0.0.0:27017/web_data"; //  database

async function connectDB() {
  console.log("Connecting to Mongo");
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch((err) => console.log(err));
}

module.exports = connectDB;
