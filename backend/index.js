const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// import
const dbConnection = require("./config/db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
// initialize
dotenv.config();
dbConnection();
const app = express();
// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// apis
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`backend server => http://localhost:8000`);
});
