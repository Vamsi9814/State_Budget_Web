const mongoose = require("mongoose");

const { Schema } = mongoose;

const registrationSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  aadharnumber: {
    type: String,
    required: true,
  },
  refreshToken:String,   
});

const Citregistration = mongoose.model("Citregistration", registrationSchema);
module.exports = Citregistration;
