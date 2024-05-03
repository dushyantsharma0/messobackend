const mongoose = require('mongoose');

const CartDetail=mongoose.Schema({
   
    brforeDoscount:{
        type:String,
        
    },
    catg:{
        type:String,
        required:true
    }, 
     gender:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
      isfree:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    off:{
        type:String,
        
    },
    price:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    reviews:{
        type:String,
        required:true
    },
    size:{
        type:String,
        
    },
    ProductDetail:{
        type:String,
    
    },email:{
        type:mongoose.Types.ObjectId
         ,
        ref:'user',
        required:true

        
    },
    quantity:{
        type:Number,
        required:true
    }


   
})

module.exports=mongoose.model('cart',CartDetail);