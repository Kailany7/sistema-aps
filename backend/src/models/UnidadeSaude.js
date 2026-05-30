const mongoose = require('mongoose');

const unidadeSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('UnidadeSaude', unidadeSchema);
