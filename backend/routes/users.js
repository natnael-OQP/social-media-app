const { getUser } = require("../controller/userController");

const router = require("express").Router();

router.get("/", getUser);

module.exports = router;
