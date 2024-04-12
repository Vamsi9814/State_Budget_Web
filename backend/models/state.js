const mongoose =require ('mongoose');

const { Schema } = mongoose;

const sregistrationSchema = new Schema({
    statename:{
        type: String,
        required: true,
        unique:true,
    },
    stateid:{
        type: Number,
        required: true 
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

const stateregistration = mongoose.model("stateregistration",sregistrationSchema)
module.exports=  stateregistration