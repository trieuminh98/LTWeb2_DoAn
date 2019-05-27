const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('express_react_doan', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
      // This was true by default, but now is false by default
      timestamps: false
    }
});

module.exports = sequelize;