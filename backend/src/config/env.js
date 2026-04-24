require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sistemaaps',
  jwtSecret: process.env.JWT_SECRET || 'sua_chave_secreta'
};