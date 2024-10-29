const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Para leer las variables del archivo .env
require('./config/passport');  // Configuración de estrategias de Passport
const path = require('path');
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware de sesión
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true 
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Ruta de inicio
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'views', 'index.html')); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
