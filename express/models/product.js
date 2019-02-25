'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.FLOAT,
    color: DataTypes.STRING,
    size: DataTypes.STRING
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Review, {
      foreignKey: 'product_id',
      as: 'reviews'
    });
  };
  return Product;
};
