const { Schema, model } = require("mongoose");

const signUpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = model("signUp", signUpSchema);
