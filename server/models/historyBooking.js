const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyBooking = new Schema({
    driverFullName: {type:String,required: true},
    guestFullName: {type:String,required: true},
    bill: {type: String,required: true},
    date: {type: Date,default: Date.now}
  });

  module.exports = mongoose.model('historyBooking',historyBooking);