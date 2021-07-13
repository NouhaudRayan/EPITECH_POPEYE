const db = require("../../config/db");
const bcrypt = require("bcryptjs");

const getAll = async (req, res, next) => {
  try {
    const users = await db.query("SELECT * FROM `user`");
    return res.status(200).json({ users });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};
const getBy = async (req, res, next) => {
  try {
    let user;

    if (isNaN(parseInt(req.params.param))) {
      user = await db.query("SELECT * FROM `user` where `email` = ?", [
        req.params.param,
      ]);
    } else {
      user = await db.query("SELECT * FROM `user` where `id` = ?", [
        req.params.param,
      ]);
    }
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};
const getTasks = async (req, res, next) => {
  try {
    const todos = await db.query("SELECT * FROM `todo` where `user_id` = ?", [
      req.UserId,
    ]);
    return res.status(200).json({ todos });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};
const update = async (req, res, next) => {
  try {
    const fields = [];
    const values = [];
    const userId = req.params.id;

    for (const [key, value] of Object.entries(req.body)) {
      fields.push(key);
      if (key === "password") {
        const password = await bcrypt.hash(value, 10);
        values.push(password);
      } else values.push(value);
    }

    const user = await db.query(
      "UPDATE `user` SET " +
        fields.map((i) => `${i} = ?`).join(", ") +
        " WHERE id =" +
        userId +
        ";",
      values
    );

    req.params.param = userId;
    return getBy(req, res, next);
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await db.query("DELETE FROM `user` where `id` = ?", [id]);
    return res
      .status(200)
      .json({ msg: `succesfully deleted record number : ${id}` });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = {
  getAll,
  getBy,
  getTasks,
  update,
  deleteOne,
};
