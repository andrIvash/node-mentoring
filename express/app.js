import express from 'express';
import path from 'path';
import cookieParserMiddelware from './middlewares/cookieParserMiddelware';
import queryParserMiddleware from './middlewares/queryParserMiddleware';
import router from './routes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/mongoose-user';
import Seeder from './seeders/mongoose-seed';

dotenv.config();

// DB Mongoose
try {
  (async () => {
    const mg = await mongoose.connect(`mongodb://localhost:27017/local`);
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const seeder = new Seeder(mg); // seeding data
      await seeder.seedUserAndProduct();
    }
    mg.disconnect();
  })();
} catch (err) {
  console.log(err, 'Something went wrong with the Database!');
}

// express
const app = express();
app.use(express.static(path.join(__dirname, '/src/static')));
app.set('views', path.join(__dirname, '/src/template'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie parser middleware
app.use(cookieParserMiddelware);

// query parser middleware
app.use(queryParserMiddleware);

// add base routes
app.use(router);

// main route handler
app.use('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Not found. API is on http://localhost:3000/api/' });
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ status: err.status, message: err.message });
});

export default app;
