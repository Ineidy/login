const express = require('express');
const passport = require('passport');
const { loginSuccess, loginFailure } = require('../controllers/authController');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }), loginSuccess);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/failure' }), loginSuccess);

router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/auth/failure' }), loginSuccess);

router.get('/failure', loginFailure);

module.exports = router;
