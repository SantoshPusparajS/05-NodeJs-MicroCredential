const Application = require("../models/applicationModel");
const AppError = require("../utils/AppError");

const idCheckMiddleware = async (req, res, next) => {
  try {
    if (req.params.id.includes("@")) {
      if (!(req.email === req.params.id)) {
        return next(
          new AppError(
            "You are not logged into this email to access the applications",
            403
          )
        );
      } else {
        next();
      }
    } else if (req.params.id.length === 24) {
      const application = await Application.findById(req.params.id);
      if (!application) {
        return next(new AppError("Incorrect ApplicationID", 403));
      }
      if (application.email === req.email) {
        next();
      } else {
        return next(
          new AppErrorError(
            "You are not authorised to access this application",
            403
          )
        );
      }
    } else {
      return next(
        new Error("Please search using application id or with email")
      );
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
};

module.exports = idCheckMiddleware;
