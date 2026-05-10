const mongoose = require('mongoose');

const contraRefSchema = new mongoose.Schema(
  {
    condutaTomada: {
      type: String,
      trim: true,
    },
    planoAcompanhamento: {
      type: String,
      trim: true,
    },
    relatorioAlta: {
      type: String,
      trim: true,
    },
    contato: {
      nome: { type: String, trim: true },
      telefone: { type: String, trim: true },
    },
    ubsoOrigem: {
      nome: { type: String, trim: true },
      acsResponsavel: { type: String, trim: true },
    },
    cid10: {
      type: String,
      trim: true,
    },
    profissionalResponsavel: {
      nome: { type: String, trim: true },
      crm: { type: String, trim: true },
    },
    statusGestante: {
      type: String,
      enum: ['estavel', 'atencao', 'critico'],
      default: 'estavel',
    },
    dataRetorno: {
      type: Date,
      default: Date.now,
    },

    // RELACIONAMENTO 1 - N COM ENCAMINHAMENTO
    // Uma contra-referência pertence a um encaminhamento
    referenciaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Referencia',
      required: true,
    },

    // RELACIONAMENTO 1 - N COM USUARIO
    // Uma contra-referência é registrada por um usuário
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true, TESTAR SEM TOKEN
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContraRef', contraRefSchema);