const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");
require("dotenv").config();

module.exports = {
  async login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await db.query("SELECT * FROM `user` WHERE `email` = ?", [
        email,
      ]);

      if (user.length < 1) {
        return res.status(401).json({
          msg: "Invalid Credentials",
        });
      }
      const valid = await bcrypt.compare(password, user[0].password);
      if (!valid) {
        return res.status(401).json({
          msg: "Invalid Credentials",
        });
      }
      const token = jwt.sign({ id: user[0].id }, process.env.SECRET, {
        expiresIn: "24h",
      });
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(401).json({
        msg: "Invalid Credentials",
      });
    }
  },
  async register(req, res, next) {
    const email = req.body.email;
    const name = req.body.name;
    const firstname = req.body.firstname;
    const password = await bcrypt.hash(req.body.password, 10);

    try {
      const user = await db.query("SELECT * FROM `user` WHERE `email` = ?", [
        email,
      ]);
      if (user.length > 0)
        return res.status(400).json({ msg: "account already exists" });

      const newUser = await db.query(
        "INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)",
        [email, name, firstname, password]
      );
      if (newUser) {
        const token = jwt.sign({ id: newUser.insertId }, process.env.SECRET, {
          expiresIn: "24h",
        });
        return res.status(201).json({ token });
      }
    } catch (e) {
      return res.status(500).json({ msg: "internal server error" });
    }
  },
};
