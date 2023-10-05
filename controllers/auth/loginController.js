const User = require("../../models/userModel");
const Quote = require("../../models/quoteModel");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");

const loginControllerAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Checks whether both email and password are entered
    if (!email || !password) {
      const error = "Please enter email and password!";
      next(error);
    }
    //Checks if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      //   const error = "User does not exists ! Please register.";
      //   next(error);
      return next(new Error("User does not exists"));
    }
    //Compares whether password match
    const passwordMatch = user.isPasswordMatch(password);
    if (!passwordMatch) {
      const error = "Password does not match!";
      next(error);
    }
    //creating a jwt token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: process.env.EXPIRES_IN,
    });
    res.status(200).json({
      status: "success",
      message: "Logged in successfully!",
      welcomeMessage: `Welcome ${user.firstName}!`,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Checks whether both email and password are entered
    if (!email || !password) {
      const error = "Please enter email and password!";
      next(error);
    }
    //Checks if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      //   const error = "User does not exists ! Please register.";
      //   next(error);
      return next(new AppErrorError("User does not exists", 401));
    }
    //Compares whether password match
    const passwordMatch = user.isPasswordMatch(password);
    if (!passwordMatch) {
      const error = "Password does not match!";
      return next(new AppError(error, 401));
    }
    //creating a jwt token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: process.env.EXPIRES_IN,
    });
    const quote = await Quote.find({ regid: user._id }).select(
      "-_id -__v -regid"
    );

    let quoteMsg =
      quote.length == 0
        ? "No quotes in your id. Please create one to proceed"
        : quote;
    res.status(200).json({
      status: "success",
      message: "Logged in successfully!",
      welcomeMessage: `Welcome ${user.firstName}!`,
      quoteMsg,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

module.exports = { loginControllerAuth, loginController };
