const express = require("express");
const userRoutes = require("./routes/user/user");
const todosRoutes = require("./routes/todos/todos");
const authRoutes = require("./routes/auth/auth");
const notFound = require("./middleware/notFound");
const auth = require("./middleware/auth");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.use("/user", auth, userRoutes);
app.use("/todo", auth, todosRoutes);
app.post("/login", authRoutes.login);
app.post("/register", authRoutes.register);
app.use(notFound);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
