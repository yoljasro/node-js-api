const ProductInfo = require('../models/product-info');
// const UserInfo = require('../models/product-info');

// const getUsersController = async (req, res) => {
//     const usersInfo = await UserInfo.find();
//     res.status(200).json({usersInfo});
// }



const createProductController = async (req, res) => {
    const {
        name,
        price
    } = req.body;

    const productInfo = await new ProductInfo({name, price}).save();

    res.status(201).json({productInfo})
}

module.exports = {
    // getUsersController,
    createProductController
}