const db = require("../../config/db");

const getAll = async (req, res, next) => {
  try {
    const todos = await db.query("SELECT * FROM `todo`");
    return res.status(200).json({ todos });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const getById = async (req, res, next) => {
  try {
    const todo = await db.query("SELECT * FROM `todo` where `id` = ?", [
      req.params.id,
    ]);
    if (req.customStatus) return res.status(req.customStatus).json({ todo });
    return res.status(200).json({ todo });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const create = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const status = req.body.status;
    const user_id = req.body.user_id;

    const todo = await db.query(
      "INSERT INTO `todo` (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, due_time, status, user_id]
    );

    req.params.id = todo.insertId;
    req.customStatus = 201;
    return getById(req, res, next);
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

const update = async (req, res, next) => {
  try {
    const fields = [];
    const values = [];
    const todoId = req.params.id;

    for (const [key, value] of Object.entries(req.body)) {
      fields.push(key);
      values.push(value);
    }

    const todo = await db.query(
      "UPDATE `todo` SET " +
        fields.map((i) => `${i} = ?`).join(", ") +
        " WHERE id =" +
        todoId +
        ";",
      values
    );

    req.params.id = todoId;
    return getById(req, res, next);
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const todo = await db.query("DELETE FROM `todo` where `id` = ?", [id]);
    return res
      .status(200)
      .json({ msg: `succesfully deleted record number : ${id}` });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
