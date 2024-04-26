const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createSecretToken");
const jwt = require("jsonwebtoken");

const stateregistration = require("../models/state.js");
const districtbudget1 = require('../models/district')
const districtbudget2 = require('../models/district2')
const districtbudget3 = require('../models/district3')

router.post("/adddistrict", async (req, res) => {
  try {
    const { districtName, budget1, budget2, budget3 } = req.body;
    console.log(req.body);

    if (!districtName || !budget1 || !budget2 || !budget3) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser1 = {
      name: districtName,
      allocatedbudget: budget1,
      usedbudget: 0,
    };
    console.log("came here");
    await districtbudget1.create(newUser1);
    console.log("passed above");

    const newUser2 = {
      districtName,
      allocatedbudget: budget2,
      usedbudget: 0,
    };
    await districtbudget2.create(newUser2);

    const newUser3 = {
      districtName,
      allocatedbudget: budget3,
      usedbudget: 0,
    };
    await districtbudget3.create(newUser3);

    res.status(200).json({ message: "District added successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/budget", async (req, res)=> {
  try {
    const data1 = await districtbudget1.find({});
    const data2= await districtbudget2.find({});
    const data3 = await districtbudget3.find({});
    res.status(200).json({data1: data1,data2:data2,data3:data3});
  } catch (error) {
    res.status(500).json(error);
  }
})

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