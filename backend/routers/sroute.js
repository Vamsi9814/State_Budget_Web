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
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createSecretToken");
const jwt = require("jsonwebtoken");

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
    // console.log("backend");
    const {email,password}=req.body
    if (!email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "Email and password are required." ,name:"none"});
    }
    const user = await stateregistration.findOne({ email }).exec();
    console.log("user"+user);
    if (!user || (req.body.password!==user.password)) {
      console.log("here");
      return res.status(400).json({ success: false, message: "Wrong Credentials",name:user.name });
    }

    //const { password,  ...others } = user._doc;
    // res.status(200).json({success:true});
    // navigate('/citfolder/cithome');
    const userinfo = {
      id: user._id,
      user: user.email,
    };
    // console.log(userinfo);
    const accessToken = createAccessToken(userinfo);
    const refreshToken = createRefreshToken({ user: user.email });
    user.refreshToken = refreshToken;
    const result = await user.save();
    // console.log(result);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "Logged in successfully",
      success: true,
      accessToken: accessToken,
      user: user.email,
    });
    // next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message,name:"none" });
  } 
});


module.exports = router;