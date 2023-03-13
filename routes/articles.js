const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sender("In articles");
});

module.exports = router;
