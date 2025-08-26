const express = require("express");
const morgan = require("morgan");
const app = express(); //by default the express package is closed but open after this line call the express()
const dbConnection = require("./config/db");
const userModel = require("./models/user");

app.use(morgan("dev"));

app.use(express.json()); //buildIn middlewares to get data in (req.body)
app.use(express.urlencoded({ extended: true })); //buildIn middlewares to get data in (req.body)

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get(
  "/",
  (req, res, next) => {
    const a = 5;
    const b = 10;
    //  console.log(a + b);
    next();
  },
  (req, res) => {
    res.render("index");
  }
);

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/profile", (req, res) => {
  res.send("Profile Page");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  });

  res.send(newUser);
});

app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("Data recieved");
});

app.listen(3000);
