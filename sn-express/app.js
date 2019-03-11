import SwaggerExpress from 'swagger-express-mw';
import mongoose from 'mongoose';
import express from 'express';

const app = express();
const config = {
  appRoot: __dirname
};

// DB Mongoose
try {
  (async () => {
    await mongoose.connect(`mongodb://localhost:27017/local`);
  })();
} catch (err) {
  console.log(err, 'Something went wrong with the Database!');
}

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 3000;
  app.listen(port);
});
