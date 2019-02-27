import http from 'http';
import fs from 'fs';
import path from 'path';
import mongodb from 'mongodb';
import config from '../config';

const MongoClient = mongodb.MongoClient;
const uri = `mongodb://localhost:27017/local`;

const server = http.createServer(async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = await client.db();
    const collection = await db.collection('cities');
    const length = await collection.countDocuments();

    if (length === 0) {
      const cities = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities-data.json'), 'utf8'));
      await collection.insertMany(cities);
    }
    const searchResult = await collection.aggregate([{ $sample: { size: 1 } }]).toArray()[0];
    res.write(JSON.stringify(searchResult));
    res.end();
    client.close();
  } catch (err) {
    console.log(err);
    res.write(JSON.stringify(err));
    res.end();
  }
});

server.listen(config().get('port'), () => {
  console.log(`Server running on port: ${config().get('port')}!`);
});
