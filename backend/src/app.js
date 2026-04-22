const express = require('express');
const cors = require('cors');
const conectarBanco = require('./config/db');
const { port } = require('./config/env');

const app = express();

conectarBanco();

// Middlewares
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ mensagem: 'API Gestão de Alto Risco funcionando' });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ✓`);
});

module.exports = app;