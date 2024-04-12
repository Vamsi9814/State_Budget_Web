const express = require("express");
const statebudget = require('../models/budget')
const router = express.Router();

router.post("/addbudget", async (req, res) => {
    try {
      const { amount } = req.body;
      console.log(req.body);
  
      if (!amount) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      console.log("All Fields available");
  
      const money = statebudget.findOne({stateName:"Telangana"});
      const val= money.budget;
      val = val + amount;
      money.save();
      //statebudget.findOne({stateName: "Telangana"}).budget = val;
      console.log("Befor user creation");
      res.status(200).json({ redirectUrl: "/statefolder/budget" });
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/handlebudget", async (req, res) => {
    try {
      const { amount } = req.body;
      console.log(req.body);
  
      if (!amount) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      console.log("All Fields available");
  
      const money = statebudget.findOne({stateName:"Telangana"});
      const val= money.totalbudget;
      const uval = money.urbanbudget;
      const fval = money.financialbudget;
      const eval = money.educationbudget;
      val = val + amount;
      money.save();
      //statebudget.findOne({stateName: "Telangana"}).budget = val;
      console.log("Befor user creation");
      res.status(200).json({ redirectUrl: "/statefolder/budget" });
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;