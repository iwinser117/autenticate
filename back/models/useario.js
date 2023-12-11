const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    require: true,
    minLength: [4, "Nombre de minimo 4 caracter"],
  },
  email: {
    type: "string",
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be minimum of 8 characters"],
  },
  token: {
    type: String,
  },
});

const userModel = mongoose.model('userJwt', userSchema)
module.exports = userModel;