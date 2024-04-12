//require("dotenv").config();
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const cuser = require('./routers/croute');
const muser = require('./routers/mroute');
const suser = require('./routers/sroute');
const bud = require('./routers/broute');
const duser = require('./routers/droute');
const express =require('express');
const bp = require('body-parser');
const cors = require('cors');
const users=require('./models/citizen');
const districtbudget = require('./models/district');
app = express();
app.use(express.json());
app.use(cors());
//{json}  require('express');
// app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

//app.require('express-async-errors');

/*import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
//const xss = require('xss-clean');
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';*/

//app.use(json());
app.use(cookieParser(process.env.JWT_KEY));

/*app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());*/

/*app.post('/cuse/citlogin', (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  // Verify the password
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate an authentication token (e.g., JWT)
    const authToken = generateAuthToken(user);

    // Authentication successful
    return res.json({ success: true, message: 'Login successful', authToken, userId: user.id });
  });
});*/


const port = process.env.port || 8000; 
connectDB();
app.use('/cuse',cuser);
app.use('/muse',muser);
app.use('/suse',suser);
app.use('/buse',bud);
app.use('/duse',duser);

app.listen(port, ()=>{
  console.log(`connected successfully on port ${port}`);
});

// (async function a(){

//   const districts = [
//     {  name: "Khammam", allocatedbudget: 10000, usedbudget: 8000 },
//     { name: 'Badradri', allocatedbudget: 15000, usedbudget: 12000 },
//     {  name: 'Rangareddy', allocatedbudget: 20000, usedbudget: 18000 },
//     {  name: 'Karimnagar', allocatedbudget: 25000, usedbudget: 22000 },
//     {  name: 'Adilabad', allocatedbudget: 18000, usedbudget: 15000 },
//     {  name: 'Nalgonda', allocatedbudget: 22000, usedbudget: 20000 },
//     {  name: 'Warangal', allocatedbudget: 30000, usedbudget: 28000 },
//     {  name: 'DistrictH', allocatedbudget: 17000, usedbudget: 14000 }
//   ];
//   try{
//     districts.forEach( async (district) => {
//       const newDistrict = districtbudget.create(district);
//       console.log(newDistrict)
//     });
//   }
//   catch (err) {
//     console.error('Error inserting districts:', err);
//   }
// })();

// const newDistrict = new districtbudget({
//   name: 'District Name',
//   allocatedbudget: 100000,
//   usedbudget: 50000
// });

// newDistrict.save()
//   .then(savedDistrict => {
//     console.log(`New district saved: ${savedDistrict}`);
//   })
//   .catch(err => {
//     console.error(`Error saving new district: ${err}`);
//   });