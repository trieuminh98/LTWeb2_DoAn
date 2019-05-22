const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//Option 1 đăng ký
const signup = async ({ email, fullName, password }) => {
  return { status: true, data: "Success signup" };
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
