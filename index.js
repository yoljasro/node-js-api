const express = require("express");
const authMiddleware = require('./middlewares/auth.middleware');
const app = express();
const importData = require("./data.json");
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const path = require("path");
const {
  createProductController,
  getProductInfoController,
  deleteProductController, 
  updateProductController
} = require("./controllers/product-info.controller");
const {
  createUserController,
  loginController,
  getUserController
} = require("./controllers/user.controllers");
const mongoose = require("mongoose");
const { json } = require("body-parser");
let port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Js API from JasurBek 1",
      version: "1.0.0",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "http://139.144.180.200:3000",
      },
    ],
  },
  apis: ["./index.js"],
};

app.use(cors());
app.use(json());

const swaggerSpec = swaggerJSDOC(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("public"));
app.use("/img", express.static(path.join(__dirname, "public/img")));

const uri =
  "mongodb+srv://jasur:YXnNb3qrDRuQutbR@cluster0.luf7pct.mongodb.net/test";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected MongoDB ");
  } catch (error) {
    console.log(error);
  }
}
connect();

/**
 * @swagger
 * /product-info:
 *   get:
 *     description: This is a get api call
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /product-info-buy:
 *   post:
 *     description: This is post method
 *     responses:
 *       201:
 *         description: Products saved in Database
 * 403 :
 *      description : Forbidden
 *parameters : 
    -name : TITLE 
    in : formData
    required : true
 */

/**
 * @swagger
 * /product-info-buy:
 *   get:
 *     description: this is products buy get method
 *     responses:
 *       200:
 *         description: Products lists
 * 400:
 *      description : Error user 
 *parameters : 
    -name : TITLE 
    in : formData
    required : true
 */

/**
 * @swagger
 * /product-info-buy:
 *   put:
 *     description: This is for product put method 
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /product-info-buy/:id:
 *   delete:
 *     description: This is delete method for products
 *     responses:
 *       200:
 *         description: deleted success
 */

/**
 * @swagger
 * /sign-up:
 *   post:
 *     description: This is post method
 *     responses:
 *       201:
 *         description: Sign Up succesfull
 * 403 :
 *      description : Forbidden
 *parameters : 
    -name : TITLE 
    in : formData
    required : true
 */

/**
 * @swagger
 * /sign-up:
 *   get:
 *     description: Created users in database
 *     responses:
 *       200:
 *         description: Users lists
 */

/**
 * @swagger
 * /sign-in:
 *   post:
 *     description: this is login post method
 *     responses:
 *       200:
 *         description: Users login succesfull
 */

app.use((req, res, next) => {
  req.headers.authorization
  console.log(req.path);
  next();
})

app.get("/", (req, res) => {
  res.send("Hello  world");
});

app.get("/product-info", (req, res) => {
  res.send(importData);
});

app.post("/product-info-buy", createProductController );

app.post("/auth/register", createUserController)   

app.post("/auth/login" , loginController)

app.get("/users/profile", authMiddleware, getUserController);

app.get("/product-info-buy", getProductInfoController);

app.put("/updateData", (req, res) => {
  res.send("updated succesfully");
});

app.delete("/product-info-buy/:id", deleteProductController);

app.put("/product-info-buy"  , updateProductController)

app.listen(port, () => {
  console.log(`Example app is listening on port https://localhost:${port}`);
});
