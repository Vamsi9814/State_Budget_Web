const mongoose =require ('mongoose');

const { Schema } = mongoose;

const districtSchema2 = new Schema({
    // stateName:{
    //     type: String,
    //     required: true
    // },
    districtName:{
        type: String,
        required: true,
        // unique:true
    },
    allocatedbudget:{
        type: Number,
        required: true 
    },
    usedbudget:{
        type: Number,
        required: true,
    },    
    
})

const districtbudget2 = mongoose.model("districtbudget2", districtSchema2)
module.exports=  districtbudget2