// api/index.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
const mongoose = require('./db');
const authRoutes = require('./routes/auth');

// Inicializar la aplicación
const app = express();

// Middleware de análisis de solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de la sesión
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Inicializar Passport y la sesión
app.use(passport.initialize());
app.use(passport.session());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configurar el motor de plantillas (si es necesario)
// Si decides usar EJS u otro motor de plantillas, puedes configurarlo aquí

// Rutas de autenticación
app.use(authRoutes);

// Ruta para obtener datos del usuario autenticado
app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
});

// Rutas para vistas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/home', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Exportar el módulo para Vercel
module.exports = app;
