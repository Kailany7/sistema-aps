const mongoose = require('mongoose');

const referenciaSchema = new mongoose.Schema({
  gestanteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gestante', required: true },
  tipo: { type: String, required: true },
  unidadeDestino: { type: String, required: true },
  motivo: { type: String, required: true },
  observacao: { type: String },
  status: { type: String, default: 'pendente' },
  dataReferencia: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Referencia', referenciaSchema);