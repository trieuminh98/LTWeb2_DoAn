const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const User = new Schema({
  userName: {type:String,required: true},
  fullName: {type:String,required: true},
  email: {type:String,required: true},
  password: {type:String,required: true},
  number: {type:String,required: true},
  role: {type:String,required: true}
});

module.exports = mongoose.model('User',User);