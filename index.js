const express = require("express");
const app = express();
const importData = require("./data.json");
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const path = require("path");
const { model, Schema } = require("mongoose");
const {
  createProductController,
} = require("./controllers/product-info.controller");
const mongoose = require("mongoose");
const { json } = require("body-parser");
let port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Js API from JasurBek",
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

// mongodb+srv://<username>:<password>@cluster0.luf7pct.mongodb.net/?retryWrites=true&w=majority
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
 * /getData:
 *   get:
 *     description: This is a get api call
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /saveData:
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
 * /updateData:
 *   put:
 *     description: This is update method
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /deleteData:
 *   delete:
 *     description: This is delete method api
 *     responses:
 *       200:
 *         description: deleted success
 */

app.get("/", (req, res) => {
  res.send("Hello  world");
});

app.get("/product-info", (req, res) => {
  res.send(importData);
});

app.post("/product-info", createProductController);

// const usersInfoSchema = new Schema
// ({
//   firstName: {
//       type: String,
//       required: true
//   },
//   lastName: {
//       type: String,
//       required: true
//   }
// })

app.put("/updateData", (req, res) => {
  res.send("updated succesfully");
});

app.delete("/deleteData", (req, res) => {
  res.send("deleted succesfully");
});

app.listen(port, () => {
  console.log(`Example app is listening on port https://localhost:${port}`);
});
