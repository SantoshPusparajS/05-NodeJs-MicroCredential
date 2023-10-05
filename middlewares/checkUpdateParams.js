const checkUpdateParams = (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    for (const key of keys) {
      if (
        key == "middleName" ||
        key == "zipCode" ||
        key == "addressLine1" ||
        key == "addressLine2" ||
        key == "occupation" ||
        key == "salary" ||
        key == "healthCondition" ||
        key == "lifeStyle"
      ) {
        next();
      } else {
        return next(new Error("You are not allowed to edit these fields"));
      }
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      error,
    });
  }
};

module.exports = checkUpdateParams;
