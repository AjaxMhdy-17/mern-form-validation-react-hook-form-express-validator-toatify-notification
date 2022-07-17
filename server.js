const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const path = require("path");
const app = express();

//Middlewares
app.use(express.json({ extended: false }));
app.use(cors());

///connect database
ConnectDB();

///Routes

const registerUser = require("./routers/authRoutes/registerUser");
const loginUser = require("./routers/authRoutes/loginUser");
const loadUser = require("./routers/authRoutes/loadUser");
const forgetPassword = require("./routers/authRoutes/forgetPassword");
const resetPassword = require("./routers/authRoutes/resetPassword");
const updateUserImg = require("./routers/authRoutes/updateUserImg");
const createPost = require("./routers/postRoutes/createPost");

app.use("/api", registerUser);
app.use("/api", loginUser);
app.use("/api", loadUser);
app.use("/api", forgetPassword);
app.use("/api", resetPassword);
app.use("/api", updateUserImg);
app.use("/api", createPost);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api Running");
  });
}

///port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
