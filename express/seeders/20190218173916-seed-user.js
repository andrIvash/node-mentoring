'use strict';
const bCrypt = require('bcrypt-nodejs');

const generateHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'al-x',
      password: generateHash('password'),
      firstName: 'Alan',
      lastName: 'Johnson',
      phone: '1234567890',
      email: 'alan@test.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      username: 'alis_house',
      password: generateHash('password'),
      firstName: 'Allison',
      lastName: 'House',
      phone: '0987654321',
      email: 'allison@test.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      username: 'nickpetit',
      password: generateHash('password'),
      firstName: 'Nick',
      lastName: 'Pettit',
      phone: '9836592272',
      email: 'nick@test.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      username: 'jimhoskins',
      password: generateHash('password'),
      firstName: 'Jim',
      lastName: 'Hoskins',
      phone: '7284927150',
      email: 'jim@test.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      username: 'ryancarson',
      password: generateHash('password'),
      firstName: 'Ryan',
      lastName: 'Carson',
      phone: '8263729224',
      email: 'ryan@test.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
