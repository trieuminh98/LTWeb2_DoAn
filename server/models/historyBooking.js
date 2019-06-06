const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyBooking = new Schema({
    driverEmail: {type:String,required: true},
    driverfullName: {type:String,required: true},
    guestEmail: {type:String,required: true},
    guestfullName: {type:String,required: true},
    bil: {type: String,required: true},
    data: {type: Date,default: Date.now}
  });

  module.exports = mongoose.model('historyBooking',historyBooking);