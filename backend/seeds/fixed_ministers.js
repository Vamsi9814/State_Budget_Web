const mongoose = require('mongoose');

const minregistration = require('../models/ministry'); // Adjust the path if necessary

const userData = [
  { minname: 'Education', email: 'educationunderscore@gmail.com', password: 'vfcdxsza' },
  { minname: 'Finance', email: 'financeunderscore@gmail.com', password: 'r4e3w2q1' },
  { minname: 'Health', email: 'healthunderscore@gmail.com', password: '12344321' },
];


const mongoURI = "mongodb://0.0.0.0:27017/web_data"; //  database

mongoose.connect(mongoURI)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const insertUser = async  () => {
    // userData.map(async (e,index)=>{
        let newUser = await minregistration.insertMany(userData);
    // })
};

insertUser();

// mongoose.connection.close(); 
