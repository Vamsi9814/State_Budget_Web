const mongoose =require ('mongoose');

const { Schema } = mongoose;

const districtSchema3 = new Schema({
    // stateName:{
    //     type: String,
    //     required: true
    // },
    districtName:{
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

const districtbudget3 = mongoose.model("districtbudget3", districtSchema3)
module.exports=  districtbudget3