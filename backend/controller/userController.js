const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "homepage" });
});

module.exports = {
  getUser,
};
