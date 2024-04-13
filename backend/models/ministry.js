const mongoose =require ('mongoose');

const { Schema } = mongoose;

const mregistrationSchema = new Schema({
    minname:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    refreshToken:String,      
})

const minregistration = mongoose.model("minregistration", mregistrationSchema)
module.exports=  minregistration