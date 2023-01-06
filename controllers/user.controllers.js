const SignUp = require("../models/sign-up");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const getUserController = async (req, res) => {
  const { userId } = req.user;
  const user = await User
  .findOne({_id: userId})
  .select('email name');

  res.status(200).json({ user });
};

const createUserController = async (req, res) => {
  try {
    console.log(req.body); 
    const { email, password, name } = req.body;

    const candidate = await User.findOne({ email });

     
    if (candidate)
      return res.status(400).json({message: 'Email already exits'});

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = {
      email,
      password: hashPassword,
      name
    }

    const user = await new User(newUser).save();

    res.status(201).json({message: 'User succesfully created', data: user});
  } catch (e) {
    console.log(e.message);
    res.status(500).json({message: 'Server error'});
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({message: 'User not found!'});

  const isValidePassword = await bcrypt.compare(password, user.password);

  if (!isValidePassword)
    return res.status(401).json({message: 'Login or password not found '});

  const payload = {
    userId: user._id
  };
  const accessToken = jwt.sign(payload, '123456', {expiresIn:'2h'});
  res.status(200).json({accessToken});
}

module.exports = {
  getUserController,
  createUserController,
  loginController
};
