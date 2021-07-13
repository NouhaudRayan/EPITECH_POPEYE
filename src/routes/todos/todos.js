const db = require("../../config/db");
const express = require("express");

const router = express.Router();
const todos = require("./todos.query");

router.get("/", todos.getAll);
router.post("/", todos.create);
router.get("/:id", todos.getById);
router.put("/:id", todos.update);
router.delete("/:id", todos.deleteOne);

module.exports = router;
