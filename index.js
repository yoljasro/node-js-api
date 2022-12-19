const express = require("express");
const app = express();
const importData = require("./data.json");
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors")
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
    ],
  },
  apis: ["./index.js"],
};
app.use(cors())
const swaggerSpec = swaggerJSDOC(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
 *         description: Success or Saved
 * 403 :
 *      description : Unauthorized
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
 *         description: deleted succes
 */

app.get("/", (req, res) => {
  res.send("Hello  world");
});

app.get("/getData", (req, res) => {
  res.send(importData);
});

app.post("/saveData", (req, res) => {
  res.status(201).send("saved succesfuly");
});

app.put("/updateData", (req, res) => {
  res.send("updated succesfully");
});

app.delete("/deleteData" , (req, res) => {
  res.send("deleted succesfully")
})



app.listen(port, () => {
  console.log(`Example app is listening on port https://localhost:${port}`);
});
