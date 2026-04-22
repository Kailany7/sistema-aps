const mongoose = require('mongoose');

const gestanteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  telefone: { type: String },
  endereco: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Gestante', gestanteSchema);