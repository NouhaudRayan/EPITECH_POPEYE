const db = require("../../config/db");
const express = require("express");

const router = express.Router();
const user = require("./user.query");

router.get("/", user.getAll);
router.get("/todos", user.getTasks);
router.get("/:param", user.getBy);
router.put("/:id", user.update);
router.delete("/:id", user.deleteOne);

module.exports = router;
