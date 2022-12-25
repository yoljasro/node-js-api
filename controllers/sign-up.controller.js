const SignUp = require('../models/sign-up');
// const UserInfo = require('../models/product-info');

// const getUsersController = async (req, res) => {
//     const usersInfo = await UserInfo.find();
//     res.status(200).json({usersInfo});
// }



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
    // getUsersController,
    createSignUpController
}