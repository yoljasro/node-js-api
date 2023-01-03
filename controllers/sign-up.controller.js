const SignUp = require("../models/sign-up");
// const signIn = require('../models/')
const bcrypt = require("bcrypt");

const getSignUpController = async (req, res) => {
  const signUp = await SignUp.find();
  res.status(200).json({ signUp });
};

const createSignUpController = async (req, res) => {
  const { email, password, name } = req.body;
  // bcrypt.hash(password , 10).then((has) => {
  //   SignUp.create({
  //     email : email ,
  //     password : hash ,
  //     name : name
  //   }) .then(() => {
  //      res.json("User Registered")
  //   }).catch((err) =>{
  //     if(err) {
  //       res.status(400).json({error: err})
  //     }
  //   })
  // })
  const user = await SignUp.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exits" });
  }

  const signUp = await new SignUp({ email, password, name }).save();

  res.status(201).json({ signUp });
};

module.exports = {
  getSignUpController,
  createSignUpController,
};
