const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('./db');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use(authRoutes);

// Rutas para vistas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/home', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
