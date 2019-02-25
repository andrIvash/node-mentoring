'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    product_id: DataTypes.INTEGER,
    author: DataTypes.STRING,
    text: DataTypes.STRING
  }, {});
  return Review;
};
