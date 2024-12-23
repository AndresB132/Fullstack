const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const songRoutes = require('./routes/songRoutes');

const app = express();
const port = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/musicDB').then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Rutas
app.use('/api/songs', songRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
