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
// const citiz=require("./models.citizen")
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createSecretToken");
const jwt = require("jsonwebtoken");

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
    
    console.log(req.body);
    // console.log("backend");
    const {email,password}=req.body
    if (!email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "Email and password are required." ,name:none});
    }
    const user = await minregistration.findOne({ email }).exec();
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
    res.status(500).json({ success: false, message: error.message,name:none });
  } 
});

const refreshTokenController = async (req, res) => {
  //   console.log("refreshtoken");
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await Citregistration.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.email !== decoded.user) return res.sendStatus(403);
    const studInfo = {
      id: user._id,
      user: user.email,
    };
    // console.log(studInfo);
    const accessToken = createAccessToken(studInfo);
    res.json({
      message: "Access Token generated succesfully",
      success: true,
      role: 1,
      accessToken: accessToken,
      user: user.email,
    });
  });
};

const Logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("No cookie found");
    return res.sendStatus(204);
  } //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const user = await Citregistration.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  user.refreshToken = "";
  const result = await user.save();
  // console.log("Logout", result);

  res.clearCookie("jwt", {
    path: "/",
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  //   console.log("logged out");
  res.status(204).json({ message: "Logged Out Successfully" });
};


module.exports = router;
