const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const User = require('./../models/user');
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
    console.log(payload);
    const {id,email} = payload.data;
    User.findOne({
        where : {
            id: id,
            email: email
        }
    }).then(user => {
        if(user){
            console.log("thanh cong");
            return done(null,user);
        }else{
            console.log("that bai");
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
