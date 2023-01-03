const { Schema, model } = require("mongoose");

const signInSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

module.exports = model("signIn", signInSchema);
