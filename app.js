const express = require("express");
const morgan = require("morgan");
const app = express(); //by default the express package is closed but open after this line call the express()
const dbconnection = require("./config/db");
const userModel = require("./models/user");
const { render } = require("ejs");
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

// Creating a user and save it to data base
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

// Read the user which stored in data base
app.get("/get-users", (req, res) => {
  userModel
    .find({
      username: "c",
    })
    .then((users) => {
      res.send(users);
    });
});

// UPDATING THE USER
app.get("/update-user", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "divyanshi",
    },
    {
      email: "dibbu@1404.com",
    }
  );
  res.send("User Updated");
});

// DELETING USER
app.get("/delete-user", async (req, res) => {
  await userModel.findOneAndDelete({
    username: "a",
  });
  res.send("User-Deleted");
});

app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("Data recieved");
});

app.listen(3000);
