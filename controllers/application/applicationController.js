const Application = require("../../models/applicationModel");
const Quote = require("../../models/quoteModel");
const User = require("../../models/userModel");
const AppError = require("../../utils/AppError");

const getApplication = async (req, res, next) => {
  try {
    let application;
    const id = req.params.id;
    if (id.includes("@")) {
      application = await Application.find({ email: id }).select("-_id -__v");
      if (application.length === 0) {
        return next(new Error("Please check the email id"));
      }
      res.status(200).json({
        status: "success",
        application,
      });
    } else if (!id.includes("@") && id.length === 24) {
      application = await Application.findById(id).select("-_id -__v");
      if (!application) {
        return next(new Error("Invalid Application Id"));
      }
      res.status(200).json({
        status: "success",
        application,
      });
    } else {
      return next(
        new Error("Please search with correct application id or email id")
      );
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
};

const createApplication = async (req, res) => {
  try {
    let application;
    const user = await User.findById(req.regid).select("-_id -__v -password");
    const quote = await Quote.findOne({ regid: req.regid }).select(
      "-_id -__v -regid"
    );
    const app = Object.assign({}, user._doc, req.body, quote._doc);
    application = await Application.create(app);
    res.status(201).json({
      status: "success",
      message: `Application has been submitted successfully. Application id is ${application._id}`,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-_id -__v");

    res.status(200).json({
      status: "success",
      message: "Your application has been successfully updated",
      application,
    });
  } catch (error) {
    res.status(304).json({
      status: "Not Modified",
      error,
    });
  }
};

module.exports = {
  createApplication,
  getApplication,
  updateApplication,
};
