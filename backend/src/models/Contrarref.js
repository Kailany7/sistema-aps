const mongoose = require('mongoose');

const contrarrefSchema = new mongoose.Schema({
  gestanteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gestante', required: true },
  referenciaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Referencia' },
  unidadeOrigem: { type: String, required: true },
  condicaoAtual: { type: String, required: true },
  tratamentoRealizado: { type: String },
  retornoPrevisto: { type: Date },
  observacao: { type: String },
  status: { type: String, default: 'pendente' }
}, { timestamps: true });

module.exports = mongoose.model('Contrarref', contrarrefSchema);