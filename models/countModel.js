const mongoose = require('mongoose');

const CountSchma=mongoose.Schema({
   
    email_id:{
        type:mongoose.Types.ObjectId
         ,
        ref:'user',
        required:true

        
    },count:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('count',CountSchma);