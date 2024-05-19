require('dotenv').config()
const express =require('express');
const Router = require('./routers/userRouter')
const mongoose =require('mongoose');
 mongoose.connect(process.env.Mongoose_Connection)
 const cors=require('cors');



const app = express();

 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cors());
 app.use('/',Router);


    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    })