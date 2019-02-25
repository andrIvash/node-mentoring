'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      'product_id': 1,
      'author': 'John Z',
      'text': 'Good staff',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      product_id: 1,
      author: 'Bill G',
      text: 'Awesome goods',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      product_id: 2,
      author: 'Andrew L',
      text: 'Not bad',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
