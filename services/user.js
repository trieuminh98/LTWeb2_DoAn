const bcrypt = require("bcrypt");
const User = require('./../models/user')
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//Hàm đăng ký
const signup = async ({ email, fullName, password }) => {
  try {
    const isUserExist = await User.findOne({
      'email': email,
      'fullName': fullName
    });
    if (isUserExist) {
      return { status: false, data: "email existing." };
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      if (hash) {
        const userResult = new User({
          //Opt 1
          'email': email,
          'password': hash,
          //Opt 2
          fullName,
          //Opt 3
          username: email
        });
        return { status: true, data: "Success signup" };
      } else {
        return { status: false, data: "hash password fail" };
      }
    }
  } catch (err) {
    console.log(err);
    return { status: false, data: "fail when signup" };
  }
};

const login = async ({email, password }) => {
  return { status: true , token:'xxxxxxxx' , data: 'isUserExist.fullName' };
};

//Option 2
// const signup = ({ email, fullName, password }) => {
//   return User.findOne({
//     where: {
//       email: email
//     }
//   })
//     .then(result => {
//       if (result) {
//         return { status: false, data: "email existing." };
//       } else {
//         return bcrypt.hash(password, saltRounds).then(hash => {
//           if (hash) {
//             return User.create({
//               email: email,
//               password: hash,
//               fullName: fullName
//             }).then(result => {
//               return { status: true, data: "Success" };
//             });
//           } else {
//             return { status: false, data: "hash password fail" };
//           }
//         });
//         // Store hash in your password DB.
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       return { status: false, data: "fail when signup" };
//     });
// };

const service = {
  signup,login
};

module.exports = service;
