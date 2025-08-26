const express = require("express");
const morgan = require("morgan");
const app = express(); //by default the express package is closed but open after this line call the express()

app.use(morgan("dev"));

app.set("view engine", "ejs");

app.get(
  "/",
  (req, res, next) => {
    const a = 5;
    const b = 10;
    console.log(a + b);
    next()
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

app.listen(3000);
