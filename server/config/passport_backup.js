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
    let user = {
        username: 'minh',
        id: 69
    }
    return done(null,user);
});



const applyPassport = (passport) => {

    passport.use(jwtLogin);
}



module.exports = applyPassport;
