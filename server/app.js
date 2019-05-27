const express = require('express');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const passport = require('passport');
const applyPassport = require('./config/passport');
const socketManaer = require('./socket/socket');

//Kết nối tới socket
socketManaer(io);

//Kết nối tới tới mongodb bằng mongoose
mongoose.connect('mongodb://localhost:27017/minh-bike', {useNewUrlParser: true});


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

app.get('/',(req,res,next) => {
    res.json({users: [{username: 'minh' }]})
})

app.use('/user',userRoute);

server.listen(port,() => console.log(`Listening on port ${port}`));