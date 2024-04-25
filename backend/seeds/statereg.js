const mongoose = require('mongoose');

const stateregistration = require('../models/state'); // Adjust the path if necessary

const userData = [
  { statename: 'Telangana', stateid : 1, email: 'telanganaunderscore@gmail.com', password: 'abcdefgh' },
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
        let newUser = await stateregistration.insertMany(userData);
    // })
};

insertUser();

// mongoose.connection.close(); 
