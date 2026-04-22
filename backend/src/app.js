const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const gestanteRoutes = require('./routes/gestante.routes');
const referenciaRoutes = require('./routes/referencia.routes');
const contrarrefRoutes = require('./routes/contrarref.routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/gestantes', gestanteRoutes);
app.use('/api/referencias', referenciaRoutes);
app.use('/api/contrarref', contrarrefRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;