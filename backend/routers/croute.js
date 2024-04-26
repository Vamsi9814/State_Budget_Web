const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const citiz=require("./models.citizen")
const nodemailer=require("nodemailer");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createSecretToken");
const jwt = require("jsonwebtoken");

//import citregistration from '../models/citizen.js';
const Citregistration = require("../models/citizen.js");
router.post("/send-email", async(req,res)=>{
  console.log("in send-email");
  console.log(req.body);
  const {complaint,mail}=req.body;

  try {
      
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
          user: '421145@student.nitandhra.ac.in',
          pass: '421145gvsv'
        }
    });
    
    await transporter.sendMail({
      from: '421145@student.nitandhra.ac.in',
      to: mail,
      subject: 'Complaint Registered in Finance',
      text: complaint
  });
  console.log("Mail Sent");
    } catch (error) {
      console.error('Error sending email:', error);
    }
});

router.post("/citregister", async (req, res) => {
  try {
    const { firstname, lastname, email, password, aadharnumber } = req.body;
    console.log(req.body);

    if (!firstname || !lastname || !email || !password || !aadharnumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("All Fields available");

    const hashedPwd = await bcrypt.hash(password, 10);

    console.log("Password hashed",hashedPwd);
    const newUser = {
      firstname,
      lastname,
      email,
      password: hashedPwd,
      aadharnumber,
    };

    console.log("Before user creation");
    // res.status(200).json({ redirectUrl: "/citfolder/cithome" });
    const user = await Citregistration.create(newUser);
    console.log("user created");
    console.log(req.body);
    const userinfo = {
      id: user._id,
      role:0,
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
      role:0,
    });
    // next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/citlogin", async (req, res) => {
  try { 
    console.log(req.body);
    const {email,password}=req.body
    if (!email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "Email and password are required." });
    }
    const user = await Citregistration.findOne({ email }).exec();

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ success: false, message: "Wrong Credentials" });
    }
    const userinfo = {
      id: user._id,
      role: 0,
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
      role:0,
    });
    // next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  } 
});

router.route("/refresh").get( async (req, res) => {
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
      role: 0,
    };
    // console.log(studInfo);
    const accessToken = createAccessToken(studInfo);
    res.json({
      message: "Access Token generated succesfully",
      success: true,
      role: 0,
      accessToken: accessToken,
      user: user.email,
    });
  });
});

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