const router = require("express").Router();
const User = require("./../models/user");
const service = require('./../services/user');
const passport = require('passport');

router.post("/signup", (req, res, next) => {
  service.signup(req.body)
    .then(result => {
        console.log("result",result)
        res.json(result);
    })
});


router.post('/login',(req,res,next) => {
  service.login(req.body)
    .then(result => {
      console.log("result",result)
      res.json(result);
    })
});

router.post('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  res.json("profile ne")
})

module.exports = router;
