const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userShema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter the email id"],
    unique: [true, "Email already exists ! Please signin using the email id.."],
    lowercase: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  firstName: {
    type: String,
    required: [true, "Firstname cannot be empty"],
    maxlength: [25, "Firstname cannot be larger than 25 characs"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname cannot be empty"],
    maxlength: [25, "Lastname cannot be larger than 25 characs"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
    minlength: [8, "Password must be atleast 8 characters"],
    maxlength: [25, "Password cannot be larger than 25 characs"],
    // select: false,
  },
  cpassword: {
    type: String,
    required: [true, "Please confirm the entered password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password must match",
    },
  },
});

//Encrypting the password using bcrypt
userShema.pre("save", async function (next) {
  try {
    //Checks if password in the current document has been modified or not
    if (!this.isModified("password")) return next();

    //hashing the password and setting the confirm password as undefined, so it wont be stored in db
    this.password = await bcryptjs.hash(this.password, 12);
    this.cpassword = undefined;
    next();
  } catch (error) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
});

//Instance method is used to compare the encrypted password and password entered by user during signin
userShema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcryptjs.compare(this.password, enteredPassword);
};

//userSchema.methods.isPasswordModified = function () {};

const userModel = mongoose.model("User", userShema);

module.exports = userModel;
