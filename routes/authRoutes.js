const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Facebook Auth Routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Discord Auth Routes
router.get('/discord', passport.authenticate('discord', { scope: ['identify', 'email'] }));
router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
