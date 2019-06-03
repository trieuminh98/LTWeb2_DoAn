const router = require("express").Router();
const User = require("./../models/user");
const service = require("./../services/user");
const passport = require("passport");
const multer = require("multer");

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  service.signup(req.body).then(result => {
    console.log("result", result);
    res.json(result);
  });
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './../public/img');
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage }).single('filePotrait')

router.post('/saveimg',function(req, res) {
  console.log(req.body);
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)
  })

});

router.post("/login", (req, res, next) => {
  service.login(req.body).then(result => {
    console.log("result", result);
    res.json(result);
  });
});

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json("profile ne");
  }
);

module.exports = router;
