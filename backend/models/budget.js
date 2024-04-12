const mongoose =require ('mongoose');

const { Schema } = mongoose;

const budgetSchema = new Schema({
    // stateName:{
    //     type: String,
    //     required: true
    // },
    totalbudget:{
        type: Number,
        required: true
    },
    financebudget:{
        type: Number,
        required: true 
    },
    urbanbudget:{
        type: Number,
        required: true,
        unique: true,
    },
    educationbudget:{
        type: Number,
        required: true
    },
    aadharNumber:{
        type: String,
        required: true
    },       
    
})

const statebudget = mongoose.model("statebudget", budgetSchema)
module.exports=  statebudget