const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    require: true,
    minLength: [4, "Nombre de minimo 4 caracter"],
    maxLength: [20, "Nombre de maximo 20 caracter"],
  },
  email: {
    type: "string",
    require: true,
    unique: true,
      match: [
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        "Email no valido"
      ],
    maxLength: [50, "Email de maximo 50 caracter"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be minimum of 8 characters"],
    maxLength: [20, "Password should be maximum of 20 characters"],
  },
  token: {
    type: String,
  },
});

const userModel = mongoose.model('userJwt', userSchema)
module.exports = userModel;