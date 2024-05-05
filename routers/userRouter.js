const express =require('express');
const UserController = require('../controllers/UserController')

const Router = express.Router();

Router.route('/register').post(UserController.Register)
Router.route('/otpsend').post(UserController.otpSend)



Router.route('/login').post(UserController.OtpCheck)

 Router.route('/cartdetail').post(UserController.CartDetail)
  
  Router.route('/cartshow').post(UserController.cartShow)
  Router.route('/totalcarts').post(UserController.TotalNumbercart)
  Router.route('/increasequentity').post(UserController.IncQuententity)





module.exports = Router;