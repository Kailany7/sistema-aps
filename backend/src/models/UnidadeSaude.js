const mongoose = require('mongoose');

const unidadeSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true, trim: true },
  macro: { type: String, trim: true },
  municipio: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('UnidadeSaude', unidadeSchema);
