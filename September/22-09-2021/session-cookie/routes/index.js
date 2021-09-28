const e = require("express");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login-proses", function (req, res, next) {
  var my = req.body.text;
  req.session.uname = my;
  console.log(req.session.uname);
  res.redirect("/home");
});

router.get("/home", function (req, res, next) {
  if (req.session.uname) {
    var user = req.session.uname;
    res.render("home", { myu: user });
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log("error");
    } else {
      res.redirect("login");
    }
  });
});

let a = 0;
router.get("/create-cookie", function (req, res, next) {
  if (a == 0) {
    res.cookie("user", a, { maxAge: 10000 });
    a++;
  }
  res.send("cookie Created");
});

router.get("/color", function (req, res, next) {
  res.render("color");
});

router.post("/index", function (req, res, next) {
  var my = req.body.color;

  res.render("index", { color: my });
});

module.exports = router;
