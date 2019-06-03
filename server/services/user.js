const bcrypt = require("bcrypt");
const User = require("./../models/user");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

//Hàm đăng ký
const signup = async ({ email, fullName, password, number, role }) => {
  try {
    const isUserExist = await User.findOne({
      email: email
    });
    if (isUserExist) {
      return { status: false, data: "email existing." };
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      if (hash) {
        const userResult = new User({
          //Opt 1
          email: email,
          password: hash,
          //Opt 2
          fullName,
          //Opt 3
          userName: email,
          number: number,
          role: role
        });
        //save data
        const saveUserResult = await userResult.save();
        if (saveUserResult) {
          return {
            status: true,
            data: "Success signup",
            id: saveUserResult._id
          };
        } else {
          return { status: false, data: "hash password fail" };
        }
      }
    }
  } catch (err) {
    console.log(err);
    return { status: false, data: "fail when signup" };
  }
};

const login = async ({ email, password }) => {
  try {
    const isUserExist = await User.findOne({
      email: email
    });
    if (isUserExist) {
      //Kiem tra password
      const isPasswordCorret = await bcrypt.compare(
        password,
        isUserExist.password
      );
      //Du lieu dung het thi gui status success va token ve client
      if (isPasswordCorret) {
        var data = {
          //vi id cua mongodb là _id
          id: isUserExist._id,
          email: isUserExist.email,
          fullName: isUserExist.fullName,
          role: isUserExist.role
        };
        var token = jwt.sign({ data }, "minh", { expiresIn: "1h" });
        return { status: true, token, data: data };
      } else {
        return { status: false, data: "password incorrect." };
      }
    } else {
      return { status: false, data: "email not existing." };
    }
  } catch (err) {
    console.log(err);
    return { status: false, data: "fail when login" };
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
  signup,
  login,
  
};

module.exports = service;
