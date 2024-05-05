const RegisterSchma=require('../models/userModels')
const otpGenerator = require('otp-generator')
const mailer=require('../helper/mailer')
const cartDetail = require('../models/cartDetail')
const countModel = require('../models/countModel')

const otp= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });

const Register = async (req,resp)=>{
     const {email}=req.body
     const user=await RegisterSchma.findOne({email})
     if(user){
        user.otp=otp
        await user.save()
         return resp.status(400).json({
             sucess:false,
             message:"user already exist"
         })
     }else{
         const newUser=new RegisterSchma({
             email,
             otp
         })
         await newUser.save()
         return resp.status(200).json({
             sucess:true,
             message:"user registered successfully"
         })
     }
     



    
 
}


const otpSend =(req,resp)=>{
    const {email}=req.body
    const msg=`<h1>your Otp is ${otp}</h1>`
        
    mailer.sendMail(email,'BX-MSHOTP',msg)

}





const OtpCheck= async(req,resp)=>{
     const {email,otp}=req.body
     const user=await RegisterSchma.findOne({email})
     if(user){
         if(user.otp==otp){
             return resp.status(200).json({
                 sucess:true,
                 message:"otp verified successfully"
             })
         }else{
            console.log(user)
             return resp.status(400).json({
                sucess:false,
                 message:"invalid otp"
             })
         }
     }
   

}
 
  const CartDetail= async(req,resp)=>{
    const {email_id,brforeDoscount,catg,gender,img,isfree,name,off,price,rating,reviews,size,ProductDetail,email}=req.body;
       const newProductdetails=ProductDetail||"no"
       const newsixe=size||"no"
console.log(email_id)

const checkCart = await cartDetail.findOne({ email: email_id,name:name }, { _id: 1, name: 1 });
if(checkCart!=null){
    
     const update= await  cartDetail.updateOne({email:email_id,name:name},{$inc:{quantity:1}})
     

}else{
    
    
    
   
    const newCart=new cartDetail({
            brforeDoscount,
            catg,
            gender,
            img,
            isfree,
            name,
            off,
            price,
            rating,
            reviews,
            size:newsixe,
            ProductDetail:newProductdetails,
            email:email_id,
            quantity:1
        })
        newCart.save()

}
         
        const count= await countModel.findOne({email_id})
        if(count){
           
          const update= await  countModel.updateOne({email_id},{$inc:{count:1}})   


        }else{
            const newCount=new countModel({
                email_id,
                count:1
            })
            newCount.save()
        }
        return resp.status(200).json({
            sucess:true,
            message:"product added to cart"
        })
        
    }
               
      
     
  const cartShow=async(req,resp)=>{
  const {email}=req.body
    const cart=await cartDetail.find({email})
    if(cart){
        return resp.status(200).json({
            sucess:true,
            data:cart
        })
    }else{
        return resp.status(400).json({
            sucess:false,
            message:"cart is empty"
        })
    }
  }
const TotalNumbercart= async(req,resp)=>{
    const {email_id}=req.body
    const cart= await countModel.findOne({email_id})
    if(cart){
        return resp.status(200).json({
            sucess:true,
            data:cart
        })
    }else{
        return resp.status(400).json({
            sucess:false,
            message:"cart is empty"
        })
    }

}
const IncQuententity= async(req, resp)=>{
    const {name,quantity,email_id}=req.body
const count= await countModel.findOne({email_id})
    


    const cart=await cartDetail.findOne({email:email_id, name})

    if(cart){

        if(count){
         if(cart.quantity>quantity){
           let data=cart.quantity-quantity
           const update=await countModel.updateOne({email_id},{$inc:{count:-data}})
        }
        if(cart.quantity<quantity){
            let data=quantity-cart.quantity
            const update=await countModel.updateOne({email_id},{$inc:{count:data}})
        }
    }
        const update=await cartDetail.updateOne({email:email_id,name},{$set:{quantity:quantity}})
        return resp.status(200).json({
            sucess:true,
            data:cart
        })
    }else{
        return resp.status(400).json({
            sucess:false,
            message:"cart is empty"
        })
    }
}

module.exports = {
    Register,
    OtpCheck,
    CartDetail,
    cartShow,
    TotalNumbercart,
    IncQuententity,
    otpSend,
}