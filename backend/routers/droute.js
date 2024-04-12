const express = require("express");
const districtbudget = require('../models/district')
const router = express.Router();

router.get("/daddbudget", async (req, res)=> {
  try {
    const data = await districtbudget.find({})
    res.status(200).json({budgetData: data})
  } catch (error) {
    res.status(500).json(err);
  }
})

router.post("/daddbudget", async (req, res) => {
    try {
        const {name,usedbudget} = req.body;
        const dataUnit =await districtbudget.findOne({name});
        dataUnit.usedbudget=usedbudget;
        dataUnit.save();
        res.status(200).json({msg:"data updated"})
    }
    catch(err){
        res.status(500).json(err);
    }
      /*const { amount } = req.body;
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
    }*/
  });

 

  router.post("/handlebudget", async (req, res) => {
    /*try {
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
    }*/
  });

module.exports = router;