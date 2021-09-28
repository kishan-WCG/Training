var express = require("express");
var router = express.Router();
var UserModel = require("../model/usermodel");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/add", function (req, res, next) {
  res.render("add");
});

router.post("/add-user", function (req, res, next) {
  const bodydata = {
    name: req.body.name,
    username: req.body.Username,
    email: req.body.email,
    password: req.body.password,
  };
  var data = UserModel(bodydata);

  data.save(function (error) {
    if (error) {
      console.log("Error For Insert Data IN DataBase");
    } else {
      console.log("Record Added ");
      res.render("add");
    }
  });
});

router.get("/display", function (req, res, next) {
  UserModel.find(function (error, data) {
    if (error) {
      console.log("Error In Fetch Data :- " + error);
    } else {
      console.log("Fetch Data :" + data);
      res.render("display", { userarray: data });
    }
  }).lean();
});

router.get("/:id", function (req, res, next) {
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid, function (error, data) {
    if (error) {
      console.log("Error in Delete" + error);
    } else {
      console.log("Record Deleted ");
      res.redirect("/display");
    }
  });
});

router.get("/edit/:id", function (req, res, next) {
  UserModel.findById(req.params.id).then((user) => {
    res.render("edit", { editdata: user });
  });
});
router.post("/edit/:id", function (req, res, next) {
  const bodydata = {
    name: req.body.name,
    username: req.body.Username,
    email: req.body.email,
    password: req.body.password,
  };
  var id = req.params.id;

  UserModel.findByIdAndUpdate(id, bodydata, function (error, data) {
    if (error) {
      console.log("Error For Insert Data IN DataBase");
    } else {
      console.log("Record Added ");
      res.redirect("/display");
    }
  });
});
module.exports = router;
