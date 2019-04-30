const router = require("express").Router();
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const service = require('./../services/user');

router.post("/signup", (req, res, next) => {
  service.signup(req.body)
    .then(result => {
        console.log("result",result)
        res.json(result);
    })
});

module.exports = router;
