const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const User = new Schema({
  userName: {type:String,required: true},
  fullName: {type:String,required: true},
  email: {type:String,required: true},
  password: {type:String,required: true},
  number: {type:String,required: true},
  role: {type:String,required: true},
  imgPortrait : {type:String,default: "None"},
  imgLicense: {type:String,default: "None"},
  status: {type:String,default: "None"},
});

module.exports = mongoose.model('User',User);