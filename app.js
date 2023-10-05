//ThirdParty Modules Imports
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

//UserModule Imports
const quoteRouter = require("./routes/quoteRoute");
const authRouter = require("./routes/authRoute");
const applicationRouter = require("./routes/applicationRoute");
const AppError = require("./utils/AppError");
const errorMiddleware = require("./middlewares/errorMiddleware");

//App Configurations
dotenv.config("./.env");
const app = express();

//Middlewares
//Set security headers
app.use(helmet());

//Limiting API hits
const limiter = rateLimit({
  max: 100,
  message: "Too many request within 1hr from same source IP",
  windowMs: 60 * 60 * 1000,
});
app.use("/api", limiter);

//Parsing body to json format
app.use(express.json());

//Data Sanitisation for nosql query and html dos attacks
app.use(xss());
app.use(mongoSanitize());

//Parameter pollutions
app.use(hpp());

//REST API requests and their status
app.use(morgan("dev"));

//Routes
app.use("/api/v1/quote", quoteRouter); //Router for quotes
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/auth", authRouter);

//Unmatched routes
app.all("*", (req, res, next) => {
  next(new AppError("Invalid Request", 500));
});

//Error Handler Middleware
app.use(errorMiddleware);

//Exports
module.exports = app;
