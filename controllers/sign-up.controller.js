const SignUp = require('../models/sign-up');

const getSignUpController = async (req, res) => {
    const signUp = await SignUp.find();
    res.status(200).json({ signUp });
  };


const createSignUpController = async (req, res) => {
    const {
        email,
        password ,
        name
    } = req.body;

    const signUp = await new SignUp({email, password , name}).save();

    res.status(201).json({signUp})
}

module.exports = {
    getSignUpController , 
    createSignUpController
}