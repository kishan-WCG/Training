var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/file', function (req, res, next) {
  res.render('file', { title: 'Express' });
});

router.post('/file', function (req, res, next) {
  var fileobject = req.files.file123;
  var filename = req.files.file123.name;
  var size = req.files.file123.size;
  var mimetype = req.files.file123.mimetype;

  if ((req.files.file123.size < 2 * 1024 * 1024)&&(req.files.file123.mimetype == "image/jpeg")) {
    fileobject.mv('public/' + filename, function (err) {
      if (err)
        return res.status(500).send(err);
      res.send('File uploaded!');
    });
  }
  else {
    res.send('File must be jpg/png/jpeg OR Max File size 2 MB Only');
  }


});

module.exports = router;
