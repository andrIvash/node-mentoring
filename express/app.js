import express from 'express';
import cookieParserMiddelware from './middlewares/cookieParserMiddelware';
import queryParserMiddleware from './middlewares/queryParserMiddleware';
import router from './routes';

// express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie parser middleware
app.use(cookieParserMiddelware);

// query parser middleware
app.use(queryParserMiddleware);

// add base route
app.use('/api', router);

// main route handler
app.use('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Not found. API is on http://localhost:3000/api/' });
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ status: err.status, message: err.message });
});

export default app;
