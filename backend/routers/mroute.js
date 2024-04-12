/*const express =require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

//import citregistration from '../models/citizen.js';
const minregistration = require('../models/ministry.js');


router.post('/minregister', async (req, res) => {
    console.log(req.body)
    try {
        const { minname,minid,email,password,aadharNumber } = req.body  
        // console.log(req.body);      

        if (!minname || !minid || !email|| !password || !aadharNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = { minname, minid, email, password: hashedPwd,aadharNumber};

        const user = await minregistration.create(newUser);
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/minlogin", async (req, res) => {
    try {
        const user = await minregistration.findOne({ email: req.body.email });

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

//import citregistration from '../models/ministry.js';
const minregistration = require("../models/ministry.js");

router.post("/minregister", async (req, res) => {
  try {
    const { minname, minid, email, password, aadharNumber } = req.body;
    console.log(req.body);

    if (!minname || !minid || !email || !password || !aadharNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("All Fields available");

    const hashedPwd = await bcrypt.hash(password, 10);

    console.log("Password hashed");
    const newUser = {
      minname,
      minid,
      email,
      password: hashedPwd,
      aadharNumber,
    };


    console.log("Befor user creation");
    const user = await minregistration.create(newUser);
    console.log("user created");
    // console.log(req.body);
    /*<Link to="/folder/cithome" className="nav-link"></Link>*/
    //res.render("/")
    res.status(200).json(user);
    console.log("this step");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/minlogin", async (req, res) => {
  try {
    const user = await minregistration.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: "Wrong Credentials" });
    }

    const { password, aadharNumber, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
