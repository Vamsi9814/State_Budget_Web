const mongoose = require('mongoose');

const district = require('../models/district'); // Adjust the path if necessary

const userData = [
    { name: 'Khammam', allocatedbudget: 10000, usedbudget: 8000 },
    {  name: 'Badradri', allocatedbudget: 15000, usedbudget: 12000 },
    { name: 'Ranagreddy', allocatedbudget: 20000, usedbudget: 18000 },
    {  name: 'Karimnagar', allocatedbudget: 25000, usedbudget: 22000 },
    { name: 'Adilabad', allocatedbudget: 18000, usedbudget: 15000 },
    {  name: 'Nalgonda', allocatedbudget: 22000, usedbudget: 20000 },
    {  name: 'Warangal', allocatedbudget: 30000, usedbudget: 28000 },
    {  name: 'Medak', allocatedbudget: 17000, usedbudget: 14000 },
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
        let newUser = await district.insertMany(userData);
    // })
};

insertUser();

// mongoose.connection.close(); 
