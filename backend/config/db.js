const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = dbConnection;
