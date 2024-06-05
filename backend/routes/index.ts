const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/messages", require("./message.route"));

module.exports = router;
