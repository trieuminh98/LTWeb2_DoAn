const express = require('express');
const app = express();
const port = 5000;
const db = require('./database/mysql');
const User = require('./models/user');
const userRoute = require('./routes/user');
const passport = require('passport');
const applyPassport = require('./config/passport');
const session = require('express-session');


//CORS, SERVER này chỉ cho phép server localhost:3000 gửi request đến
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  next();
});

passport.use(passport.initialize());
applyPassport(passport);




app.use(express.json());
app.use(express.urlencoded({extended: true})); //parse về json để nhận req bên client

db
  .authenticate()
  .then(() => {
    console.log('Cau hinh thanh cong.');
  })
  .catch(err => {
    console.error('Loi ket noi toi co so du lieu:', err);
  });



app.get('/',(req,res,next) => {
    User.findAll().then(users => {
        res.send(users);
      });    
})

app.use('/user',userRoute);

app.listen(port,() => console.log(`Listening on port ${port}`));