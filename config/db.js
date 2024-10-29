const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Suprimir la advertencia
require('dotenv').config(); // Cargar las variables de entorno

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connect;
