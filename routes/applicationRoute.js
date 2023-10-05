const express = require("express");
const router = express.Router();
const {
  createApplication,
  getApplication,
  updateApplication,
} = require("../controllers/application/applicationController");

const authController = require("../controllers/auth/authController");

const idCheckMiddleware = require("../middlewares/idCheckMiddleware");
const checkUpdateParams = require("../middlewares/checkUpdateParams");

router.route("/").post(authController, createApplication);
router
  .route("/:id")
  .get(authController, idCheckMiddleware, getApplication)
  .patch(
    authController,
    idCheckMiddleware,
    checkUpdateParams,
    updateApplication
  );

module.exports = router;
