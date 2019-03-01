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

  createData = async (modelName, sourceFile) => {
    console.log('Insert Data', modelName);
    try {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, sourceFile), 'utf8'));
      await this.mongoose.models[modelName].collection.insertMany(data);
    } catch (err) {
      console.log('error in cities data', err);
    }
  };

  seedCity = async () => {
    try {
      await this.open();
      await this.dropDatabase();
      await this.requireModels();
      await this.createData('City', '../../http-servers/cities-data.json');
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
      await this.createData('City', '../../http-servers/cities-data.json');
      await this.createData('User', '../test_userData.json');
      await this.createData('Product', '../test_productData.json');
      await this.createData('Review', '../test_reviewData.json');
    } catch (err) {
      console.log('Close connection', err);
      this.mongoose.disconnect();
    }
  };
}
export default Seeder;



