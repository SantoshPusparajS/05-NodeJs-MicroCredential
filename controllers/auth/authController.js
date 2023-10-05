const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../../models/userModel");
const AppError = require("../../utils/AppError");

const authController = async (req, res, next) => {
  try {
    let token;
    //Check whether auth token is in header
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      const err = "Please login/signup to proceed with the application";
      return next(new AppError(err, 401));
    } else {
      token = req.headers.authorization.split(" ")[1];
    }
    //Comparing the JWT token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_TOKEN
    );
    const user = await User.findById(decoded.id);
    //Confirm whether user still exists
    if (!user) {
      const err = "User not exists";
      return next(new AppError(err, 401));
    }
    req.regid = user._id;
    req.name = user.firstName;
    req.email = user.email;
    //Check if user changes the password after JWT token has been issued
    //const isPasswordModified = user.passwordModified()
    next();
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};

module.exports = authController;
