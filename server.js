//Importing Module
const app = require("./app");
const dotenv = require("dotenv");
const connection = require("./database/connection");

//Configuration
dotenv.config("./.env");

//If port is not provided in .env file then it will assume 9000 as default port and start the server at 9000
const port = process.env.PORT || 9000;

//DB Connection
//Server will start only when the mongodb connected successfully without an error
//Otherwise it will throw an error
// connection
//   .then(() => {
//     console.log("DB Connected Successfully!");
//     app.listen(port, () => {
//       console.log(`Server is connected at ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

connection
  .then(() => {
    console.log("DB Connected Successfully!");
    app.listen(port, () => {
      console.log(`Server is connected at ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
