const bcrypt = require("bcrypt");
const User = require("./../models/user");
const saltRounds = 10;
const Hisotry = require("./../models/historyBooking");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

//Hàm đăng ký
const signup = async ({ email, fullName, password, number, role, namePortrait, nameLicense }) => {
  try {
    const isUserExist = await User.findOne({
      email: email
    });
    if (isUserExist) {
      return { status: false, data: "email existing." };
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      if (hash) {
        let userStatus;
        let userActive;
        if(role == 'driver'){
           userStatus = "lock"
        }
        const userResult = new User({
          //Opt 1
          email: email,
          password: hash,
          //Opt 2
          fullName,
          //Opt 3
          userName: email,
          number: number,
          role: role,
          imgPortrait: namePortrait,
          imgLicense: nameLicense,
          status: userStatus,
        });
        //save data
        const saveUserResult = await userResult.save();
        if (saveUserResult) {
          return {
            status: true,
            data: "Success signup",
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

const saveHistory = async (data) => {
  try {
    const historyResult = await new Hisotry({
      driverFullName : data.driver,
      guestFullName : data.guest,
      bill : data.money,
    })
    const saveHistoryResult = await historyResult.save();
    if(saveHistoryResult){
      return {
        status: true,
        data: "save success"
      }
    }
  } catch(err){
    return {status: false,data: "fail when save"}
  }
}

const checkAllDriver = async () => {
  try {
    const checkAllDriverResult = await User.find({
      role: "driver",
    });
    if(checkAllDriverResult){
      var allDriver = checkAllDriverResult.map(driver => {
        return {
          email: driver.email,
          fullName: driver.fullName,
          number: driver.number,
          status: driver.status,
          active: driver.active
        }
      })
      return{
        status: true,
        mess: "check success",
        data: allDriver
      }
    }
    else{
      return{
        status: false,
        mess: "check fail,no driver in db"
      }
    }
  } catch(err){
    return {status: false,data: "fail when check"}
  }
}

const activeRequest = async (driverEmail) => {
  try {
    const checkDriverEmailResult = await User.findOne({
      email: driverEmail
    })
    if(checkDriverEmailResult){
      let updateStatus;
      if(checkDriverEmailResult.status == "lock"){
        updateStatus = "active";
      }else{
        updateStatus = "lock"
      }
      const updateRes = await User.updateOne({
        email: driverEmail
      },{
        status: updateStatus
      });
      if(updateRes){
        return {
          status: true,
          data: "update success"
        }
      }else{
        return{
          status: false,
          data: "update fail"
        }
      }
    }else{
      return{
        status:false,
        data: "email not existing"
      }
    }
  } catch(err){
    return{
      status: false,
      data: "fail when update"
    }
  }
}

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
  saveHistory,
  checkAllDriver,
  activeRequest
};

module.exports = service;
