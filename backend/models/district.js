const mongoose =require ('mongoose');

const { Schema } = mongoose;

const districtSchema = new Schema({
    // stateName:{
    //     type: String,
    //     required: true
    // },
    name:{
        type: String,
        required: true,
        unique:true
    },
    allocatedbudget:{
        type: Number,
        required: true 
    },
    usedbudget:{
        type: Number,
        required: true,
        // unique: true,
    },    
    
})

const districtbudget = mongoose.model("districtbudget", districtSchema)
module.exports=  districtbudget