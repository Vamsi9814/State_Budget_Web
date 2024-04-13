const mongoose = require('mongoose');

const district2 = require('../models/district2'); // Adjust the path if necessary

const userData = [
    { districtName: 'Khammam', allocatedbudget: 10000, usedbudget: 8000 },
    {  districtName: 'Badradri', allocatedbudget: 15000, usedbudget: 12000 },
    { districtName: 'Ranagreddy', allocatedbudget: 20000, usedbudget: 18000 },
    {  districtName: 'Karimnagar', allocatedbudget: 25000, usedbudget: 22000 },
    { districtName: 'Adilabad', allocatedbudget: 18000, usedbudget: 15000 },
    {  districtName: 'Nalgonda', allocatedbudget: 22000, usedbudget: 20000 },
    {  districtName: 'Warangal', allocatedbudget: 30000, usedbudget: 28000 },
    {  districtName: 'Medak', allocatedbudget: 17000, usedbudget: 14000 },
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
        let newUser = await district2.insertMany(userData);
    // })
};

insertUser();

// mongoose.connection.close(); 
