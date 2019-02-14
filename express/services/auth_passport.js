import passport from 'passport';
import LocalStrategy from 'passport-local';
import config from '../config';
import path from 'path';
import lowdb from 'lowdb';

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, '../db.json'));
const db = lowdb(adapter);

class Authentication {
  constructor() {
    console.log('Authentication Initialization.');
    this.passport = passport;
  }

  localAuthentication = (username, password, done) => {
    console.log('[PassportJs] Authenticating using local strategy.');
    if (config().get('username') === username && config().get('password') === password) {
      const currentUser = db.get('users').find({ id: 1001 }).value();
      return done(null, currentUser);
    } else {
      return done(null, false);
    }
  };

  initialize = () => {
    this.passport.use('local', new LocalStrategy(this.localAuthentication));
    this.passport.serializeUser(this.serializeUser);
    this.passport.deserializeUser(this.deserializeUser);
  };

  serializeUser = (user, done) => {
    console.log("Serializing user!");
    done(null, user.username);
  };

  deserializeUser = (id, done) => {
    console.log("Deserializing user!");
    done(null, {username: config().get('username'), password: config().get('password')});
  };
}

export default Authentication;
