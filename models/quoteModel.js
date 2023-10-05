const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const quoteSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, "Please enter the state field"],
    enum: { values: ["TN", "AP", "KA"], message: "{VALUE} is not supported" },
  },
  dob: {
    type: Date,
    required: [true, "Please enter Date Of Birth"],
  },
  gender: {
    type: String,
    required: [true, "Please enter gender"],
    enum: { values: ["M", "F", "O"], message: "{VALUE} is not supported" },
  },
  height: {
    type: Number,
    required: [true, "Please enter height"],
    max: [215, "Height should not be more than 215. But you enter {VALUE}"],
  },
  weight: {
    type: Number,
    min: [25, "Weight should not below 25. But you enter {VALUE}"],
    max: [158, "Weight should not be more than 158. But you enter {VALUE}"],
    required: [true, "Please enter weight"],
  },
  smokerStatus: {
    type: String,
    required: [true, "Please enter smoker status"],
    enum: {
      values: ["Smoker", "Non-Smoker"],
      message: "{VALUE} is not supported",
    },
  },
  coverageAmount: {
    type: Number,
    required: [true, "Please enter coverageAmount"],
  },
  coveragePeriod: {
    type: Number,
    required: [true, "Please enter coveragePeriod"],
    enum: { values: [15, 20, 25, 30], message: "{VALUE} is not supported" },
  },
  regid: {
    type: ObjectId,
  },
  email: {
    type: String,
  },
});

//Creating document middleware to check the age of user before saving the document in mongodb
quoteSchema.pre("save", async function (next) {
  try {
    //getting the dob of each document
    const dob = await this.dob;
    const currentDate = new Date();
    //calculating the age of the applicant
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (age > 18 && age < 65) {
      next();
    }
    //Anything that it passing as an argument to next() function will treat as an error
    const err = "User is not eligible to generate the quote!";
    next(err);
  } catch (err) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
});

const quote = mongoose.model("quote", quoteSchema);

module.exports = quote;
