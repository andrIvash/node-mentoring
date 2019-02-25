'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Supreme T-Shirt',
      brand: 'Supreme',
      price: 99.99,
      color: 'blue',
      size: 'XL',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      name: 'Darkest T-Shirt',
      brand: 'ZZ',
      price: 21.99,
      color: 'black',
      size: 'X',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
