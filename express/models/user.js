'use strict';
const bCrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    // associations can be defined here
  };

  User.prototype.generateHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
  };

  User.prototype.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password);
  };

  return User;
};
