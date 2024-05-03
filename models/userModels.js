const mongoose = require('mongoose');

const RegisterSchma=mongoose.Schema({
   
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model('Register',RegisterSchma);