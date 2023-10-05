const Quote = require("../../models/quoteModel");
//Controller used to retrive the quote using the quote id
const getQuoteController = async (req, res) => {
  try {
    //select option is used to include or exclude the values in the output
    let quote;
    const id = req.email;
    quote = await Quote.find({ email: id }).select("-_id -__v");
    if (!quote.length == 0) {
      res.status(200).json({
        status: "success",
        quote,
      });
    } else {
      res.status(200).json({
        message: "There are no saved quotes found!",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Error",
      error,
    });
  }
};
//Controller used to create the quote
const createQuoteController = async (req, res) => {
  try {
    const quote = await Quote.create({
      ...req.body,
      regid: req.regid,
      email: req.email,
    });
    res.status(200).json({
      status: "Success",
      data: {
        message: `Hello ${req.name}! Your quote id is : ${quote._id}. Do you want to proceed with the application ? Please navigate`,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      error,
    });
  }
};
//Controller used to update the already created quote
const updateQuoteController = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        message: "Your data has been updated successfully!",
        quote,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      err,
    });
  }
};

module.exports = {
  getQuoteController,
  createQuoteController,
  updateQuoteController,
};
