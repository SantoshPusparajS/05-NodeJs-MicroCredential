const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      cpassword: req.body.cpassword,
    });
    //creating a jwt token
    // const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    //   expiresIn: process.env.EXPIRES_IN,
    // });
    res.status(201).json({
      status: "created",
      data: {
        FirstName: user.firstName,
        LastName: user.lastName,
        LoginId: user.email,
        message: "Please login using loginId and password",
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
};

module.exports = signUpController;
