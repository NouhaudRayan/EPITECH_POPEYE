const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ msg: "No token, authorization denied" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.UserId = payload.id;
  } catch {
    return res.status(401).send({ msg: "Token is not valid" });
  }
  next();
};

module.exports = auth;
