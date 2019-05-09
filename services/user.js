const User = require("./../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//Option 1 đăng ký
const signup = async ({ email, fullName, password }) => {
  try {
    const isUserExist = await User.findOne({
      where: {
        email: email
      }
    });
    if (isUserExist) {
      return { status: false, data: "email existing." };
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      if (hash) {
        const userResult = User.create({
          email: email,
          password: hash,
          fullName: fullName
        });
        return { status: true, data: "Success" };
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
  try {
    const isUserExist = await User.findOne({
      where: {
        email : email,
      }
    });
  if(isUserExist){
    //du lieu dung' hết
    var data = {
      id: isUserExist.id,
      email: isUserExist.email
    };
    var token = jwt.sign({ data}, 'minh', { expiresIn: '1h' });
    return { status: true,token };
  }else{
    return { status: false, data: "email not existing." };
  }}catch (err) {
    console.log(err);
    return { status: false, data: "fail when signup" };
  }
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
