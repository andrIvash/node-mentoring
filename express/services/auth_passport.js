import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import TwitterStrategy from 'passport-twitter';
import {Strategy as GoogleStrategy } from 'passport-google-oauth20';
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

  facebookAuthentication = (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  };

  twitterAutentication = (token, tokenSecret, profile, done) => {
    return done(null, profile);
  };

  googleAutentication = (token, tokenSecret, profile, done) => {
    return done(null, profile);
  };

  initialize = () => {
    this.passport.use('local', new LocalStrategy(this.localAuthentication));
    this.passport.use('facebook', new FacebookStrategy({
        clientID: process.env['FACEBOOK_CLIENT_ID'],
        clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
        callbackURL: '/api/auth2/facebook/return'
      }, this.facebookAuthentication));
    this.passport.use('twitter', new TwitterStrategy({
        consumerKey: process.env['TWITTER_CONSUMER_KEY'],
        consumerSecret:  process.env['TWITTER_CONSUMER_SECRET'],
        callbackURL: '/api/auth2/twitter/return'
      },this.twitterAutentication));
    this.passport.use('google', new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/api/auth2/google/return'
      },this.googleAutentication));
    this.passport.serializeUser(this.serializeUser);
    this.passport.deserializeUser(this.deserializeUser);
  };

  serializeUser = (user, done) => {
    console.log("Serializing user!");
    done(null, user);
  };

  deserializeUser = (user, done) => {
    console.log("Deserializing user!");
    done(null, user);
  };
}

export default Authentication;
