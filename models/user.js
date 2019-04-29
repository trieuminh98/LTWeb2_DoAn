const db = require('./../database/mysql');
const Sequelize = require('sequelize');

const userModel = db.define('user', {
    // attributes
    email: {
      type: Sequelize.STRING, allowNull: false},
    password: {
      type: Sequelize.STRING, allowNull: false},
    fullName: {
      type: Sequelize.STRING, allowNull: false},  
})

module.exports = userModel;