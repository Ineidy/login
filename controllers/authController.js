const passport = require('passport');

exports.loginSuccess = (req, res) => {
    res.status(200).json({ message: 'Login successful', user: req.user });
};

exports.loginFailure = (req, res) => {
    res.status(401).json({ message: 'Login failed' });
};
