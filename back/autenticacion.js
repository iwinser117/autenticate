const userModel = require("./models/useario");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return next("Please login to access the data");
    } else {
      const verify = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = await userModel.findById(verify.id);
      next();
    }
  } catch (e) {
    return next(e);
  }
};

module.exports = isAuthenticated;
