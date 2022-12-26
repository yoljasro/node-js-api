const { request } = require("express");
const ProductInfo = require("../models/product-info");

const getProductInfoController = async (req, res) => {
  const productInfo = await ProductInfo.find();
  res.status(200).json({ productInfo });
};

const createProductController = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await ProductInfo.findOne({ name });
    if (product) {
      return res.status(400).json({ message: "Already exits" });
    }

 

    const productInfo = await new ProductInfo({ name, price }).save();

    res.status(201).json({ productInfo });
  } catch (e) {
    console.log(e.message);
  }
};

const deleteProductController = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductInfo.findOne({ _id: id });

      if (!product)
        return res
          .status(404)
          .json({
            message: "Бунака махсулот йок йоли алакачон учирилиб буган",
          });

      await ProductInfo.deleteOne({ _id: id });
      res.status(200).json({ message: "deleted product success" });
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  };

  const updateProductController = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductInfo.findOne({ _id: id });
    } catch (e) {}
  };

module.exports = {
  getProductInfoController,
  createProductController,
  deleteProductController,
  updateProductController
};
