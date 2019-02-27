import http from 'http';
import mongoose from 'mongoose';
import config from '../config';
import Seeder from '../express/seeders/mongoose-seed';
import { City } from '../express/models/mongoose-city';

const server = http.createServer(async (req, res) => {
  try {
    const mg = await mongoose.connect(`mongodb://localhost:27017/local`);
    const citiesCount = await City.countDocuments();
    if (citiesCount === 0) {
      const seeder = new Seeder(mg); // seeding data
      await seeder.seedCity();
    }
    const random = Math.floor(Math.random() * citiesCount);
    const selectedCity = await City.findOne().skip(random);
    res.write(JSON.stringify(selectedCity));
    res.end();
    mg.disconnect();
  } catch (err) {
    console.log(err);
    res.write(JSON.stringify(err));
    res.end();
  }
});

server.listen(config().get('port'), () => {
  console.log(`Server running on port: ${config().get('port')}!`);
});
