const SignIn = require('../models/sign-in');
const signUp = require("./sign-up.controller")
const {
    createSignUpController,
    getSignUpController,
  } = require("./sign-up.controller");

const getSignInController = async (req, res) => {
    const signIn = await signIn.find(); 
    res.status(200).json({ sign });
  };

  
const createSignInController = async (req, res) => {
    const {
        email,
        password ,
    } = req.body; 
   const user =  SignIn.findOne({email : email} , (err , user) => {
        if(user) {
            if(password === user.password) {
                return res.send({message : "login succes" ,  user : user})
            }
            // else if()  {
            //     res.send({message:"wrong credentials"})
            // }
            else{
                res.send("not register")
            }
        }
    })
    

    const signIn = await new SignIn({email, password}).save();

    res.status(201).json({signIn})
}

module.exports = {
    getSignInController , 
    createSignInController
}