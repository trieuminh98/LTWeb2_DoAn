const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const User = require('./../models/user');
const ObjectId = require('mongoose').ObjectId;
//Decode token from clirny
//giãi mã chuỗi token từ client
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
// //mã bí mật
// opts.secretOrKey = 'secret';


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Bearer'),
    secretOrKey: "minh"
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    const {id,email} = payload.data;
    User.findOne({
        'email' : email,
        '_id': ObjectId(id) //Mongodb có id đặc biệt là ObjectId
    }).then(user => {
        if(user){
            console.log("thanh cong passport");
            return done(null,user);
        }else{
            console.log("that bai passport");
            return done(null,false);
        }
    }).catch(err => {
        console.log("di vao catch err",err);
        done(err,false);
    })
    // User.findById(payload._id, function(err, _user) {
    //   if (err) return done(err, false);
  
    //   if (_user) {
    //     done(null, _user);
    //   } else {
    //     done(null, false);
    //   }
    // });
});



const applyPassport = (passport) => {

    passport.use(jwtLogin);
}



module.exports = applyPassport;
