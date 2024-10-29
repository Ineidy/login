const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/User');
require('dotenv').config();

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          emails: profile.emails
        });
        await user.save();
      }
      done(null, user);
    } catch (err) {
      done(err, false, err.message);
    }
  }
));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'] 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        user = new User({
          facebookId: profile.id,
          displayName: profile.displayName,
          emails: profile.emails
        });
        await user.save();
      }
      done(null, user);
    } catch (err) {
      done(err, false, err.message);
    }
  }
));

// Discord Strategy
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/discord/callback',
    scope: ['identify', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ discordId: profile.id });
      if (!user) {
        user = new User({
          discordId: profile.id,
          displayName: profile.username,
          emails: profile.emails
        });
        await user.save();
      }
      done(null, user);
    } catch (err) {
      done(err, false, err.message);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
