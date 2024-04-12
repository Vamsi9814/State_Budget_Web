const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//import citregistration from '../models/citizen.js';
const Citregistration = require("../models/citizen.js");
router.post("/send-email",async(req,res)=>{
  console.log(req.body)
  
})
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
    res.status(200).json(user);
    console.log("this step");
    /*res.status(200).json({ redirectUrl: "/citfolder/cithome" });*/
  } catch (err) {
    res.status(500).json(err);
  }
});

// const login = (req, res, next) => {
//   const { username, password} = req.body;

//   Citregistration.findOne({ username: username }, async (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (data === null) {
//         res.status(400).json({ message: "failed" });
//       } else if (data !== null) {
//         console.log(data);
//         bcrypt.compare(password, data.password, (err, result) => {
//           if (result) {
//             res.status(200).json({
//               message: "success"
//             });
//           } else {
//             res.status(400).json({ message: "failed" });
//           }
//         });
//       }
//     }
//   })
//     .clone()
//     .catch(function (err) {
//       console.log(err);
//     });
// };


// router.post("/citlogin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the required fields are provided
//     if (!email || !password) {
//       return res.status(400).json({ error: "Please provide both email and password" });
//     }

//     // Find the user by email
//     const user = await Citregistration.findOne({ email });

//     // If user not found or password doesn't match, return error
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // If credentials are correct, send back user data without sensitive information
//     const { password: userPassword, aadharNumber, ...userData } = user._doc;
//     res.status(200).json(userData);
//   } catch (err) {
//     console.error("Error logging in:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

router.post("/citlogin", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Citregistration.findOne({ email: req.body.email }).exec();

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
