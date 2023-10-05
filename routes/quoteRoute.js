const express = require("express");
const {
  getQuoteController,
  createQuoteController,
  updateQuoteController,
} = require("../controllers/quote/quoteController");

const authController = require("../controllers/auth/authController");

const router = express.Router();

router
  .route("/")
  .post(authController, createQuoteController)
  .get(authController, getQuoteController);

router.route("/:id").patch(authController, updateQuoteController);

module.exports = router;
