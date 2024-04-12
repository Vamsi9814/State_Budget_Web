/*const express =require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

//import citregistration from '../models/citizen.js';
const stateregistration = require('../models/state.js');


router.post('/stateregister', async (req, res) => {
    console.log(req.body)
    try {
        const { statename,stateid,email,password,aadharNumber } = req.body  
        // console.log(req.body);      

        if (!statename || !stateid || !email|| !password || !aadharNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = { statename, stateid, email, password: hashedPwd,aadharNumber};

        const user = await stateregistration.create(newUser);
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/statelogin", async (req, res) => {
    try {
        const user = await stateregistration.findOne({ email: req.body.email });

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({ error: 'Wrong Credentials' });
        }

        const { password,aadharNumber, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=  router;*/


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//import citregistration from '../models/state.js';
const stateregistration = require("../models/state.js");

router.post("/stateregister", async (req, res) => {
  try {
    const { statename, stateid, email, password, aadharNumber } = req.body;
    console.log(req.body);

    if (!statename || !stateid || !email || !password || !aadharNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("All Fields available");

    const hashedPwd = await bcrypt.hash(password, 10);

    console.log("Password hashed");
    const newUser = {
      statename,
      stateid,
      email,
      password: hashedPwd,
      aadharNumber,
    };

    console.log("Befor user creation");
    const user = await stateregistration.create(newUser);
    console.log("user created");
    console.log(req.body);
    res.status(200).json(user);
    console.log("this step");
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/statelogin", async (req, res) => {
//   try {
//     const user = await stateregistration.findOne({ email: req.body.email });

//     if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
//       return res.status(400).json({ error: "Wrong Credentials" });
//     }

//     const { password, aadharNumber, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post("/statelogin", async (req, res) => {
  try {
    console.log(req.body);
    const user = await stateregistration.findOne({ email: req.body.email }).exec();

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }

    //const { password,  ...others } = user._doc;
    res.status(200).json({success:true});
    // navigate('/citfolder/cithome');
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;