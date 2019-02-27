import fs from 'fs';
import path from 'path';

class Seeder {
  constructor (mongoose) {
    this.mongoose = mongoose;
  }

  open = () => {
    if (this.mongoose.connection.readyState === 1) {
      console.log('Connect to Db');
    }
    return;
  };

  dropDatabase = () =>{
    console.log('Clear Db');
    return this.mongoose.connection.db.dropDatabase()
  };

  requireModels = () => {
    require('../models/mongoose-city');
    require('../models/mongoose-product');
    require('../models/mongoose-user');
    require('../models/mongoose-review');
    return Object.keys(this.mongoose.models).forEach(async (modelName) => {
      await this.mongoose.models[modelName].createIndexes();
    });
  };

  createCities = () => {
    console.log('Insert Data');
    try {
      const cities = JSON.parse(fs.readFileSync(path.join(__dirname, '../../http-servers/cities-data.json'), 'utf8'));
      return cities.forEach(async (cityData) => {
        const city = new this.mongoose.models.City(cityData);
        await city.save();
      });
    } catch (err) {
      console.log('error in cities data', err);
    }
  };

  createProduct = () => {
    console.log('Insert Product Data');
    try {
      const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../test_productData.json'), 'utf8'));
      return products.forEach(async (productData) => {
        const product = new this.mongoose.models.Product(productData);
        await product.save();
      });
    } catch (err) {
      console.log('error in product data', err);
    }
  };

  createReviews = () => {
    console.log('Insert Review Data');
    try {
      const reviews = JSON.parse(fs.readFileSync(path.join(__dirname, '../test_reviewData.json'), 'utf8'));
      return reviews.forEach(async (reviewData) => {
        const product = new this.mongoose.models.Review(reviewData);
        await product.save();
      });
    } catch (err) {
      console.log('error in review data', err);
    }
  };

  createUser = () => {
    console.log('Insert User Data');
    try {
      const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../test_userData.json'), 'utf8'));
      return users.forEach(async (userData) => {
        const user = new this.mongoose.models.User(userData);
        await user.save();
      });
    } catch (err) {
      console.log('error in user data', err);
    }
  };

  seedCity = async () => {
    try {
      await this.open();
      await this.dropDatabase();
      await this.requireModels();
      await this.createCities();
    } catch (err) {
      console.log('Close connection', err);
      this.mongoose.disconnect();
    }
  };

  seedUserAndProduct = async () => {
    try {
      await this.open();
      await this.dropDatabase();
      await this.requireModels();
      await this.createUser();
      await this.createProduct();
      await this.createReviews();
    } catch (err) {
      console.log('Close connection', err);
      this.mongoose.disconnect();
    }
  };
}
export default Seeder;



