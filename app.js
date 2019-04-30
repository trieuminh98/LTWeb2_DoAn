const express = require('express');
const app = express();
const port = 5000;
const db = require('./database/mysql');
const User = require('./models/user');

db
  .authenticate()
  .then(() => {
    console.log('Cau hinh thanh cong.');
  })
  .catch(err => {
    console.error('Loi ket noi toi co so du lieu:', err);
  });

//CORS, SERVER này chỉ cho phép server localhost:3000 gửi request đến
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

app.get('/',(req,res,next) => {
    User.findAll().then(users => {
        res.send(users);
      });    
})


app.get('/api/members',(req,res,next) => {
  User.findAll().then(users => {
    res.send(users);
  }); 
})

app.listen(port,() => console.log(`Listening on port ${port}`));