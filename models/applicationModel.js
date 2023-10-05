const mongoose = require("mongoose");
const User = require("../models/userModel");

const applicationSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  firstName: { type: String },
  lastName: { type: String },
  middleName: { type: String },
  addressLine1: { type: String, required: [true, "Please enter the address"] },
  addressLine2: { type: String },
  state: { type: String },
  zipCode: { type: Number, required: [true, "Please enter the zipcode"] },
  dob: { type: String },
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
  smokerStatus: { type: String },
  occupation: { type: String, required: [true, "Please enter the occupation"] },
  salary: {
    type: Number,
    required: [true, "Please enter the salary"],
    min: [2, "Salary cannot be in hundreds"],
    max: [10000000, "Salary cannot exceed 1crore"],
  },
  healthCondition: {
    type: String,
    required: [true, "Please enter the health condition"],
    enum: {
      values: ["Normal", "Diabetic", "Heart Disease"],
      message: "Choose from the list. {VALUE} is not in the list ",
    },
  },
  lifeStyle: {
    type: String,
    required: [true, "Please enter the life style"],
    enum: {
      values: ["Sedentry", "Active", "Athletic"],
      message: "Choose from the list. {VALUE} is not in the list ",
    },
  },
  coverageAmount: { type: Number },
  coveragePeriod: { type: Number },
});

const applicationModel = mongoose.model("Application", applicationSchema);

module.exports = applicationModel;
