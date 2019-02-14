import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import cookieParserMiddelware from './middlewares/cookieParserMiddelware';
import queryParserMiddleware from './middlewares/queryParserMiddleware';
import router from './routes';
import Auth from './services/auth_passport';
import dotenv from 'dotenv';

dotenv.config();
const auth = new Auth();
auth.initialize();

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

// passport
app.use(session({
  secret: 'cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

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
