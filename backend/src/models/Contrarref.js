const mongoose = require('mongoose');

const contraRefSchema = new mongoose.Schema(
  {
    conduta_tomada: {
      type: String,
      trim: true,
    },
    plano_acompanhamento: {
      type: String,
      trim: true,
    },
    relatorio_alta: {
      type: String,
      trim: true,
    },
    contato: {
      nome: { type: String, trim: true },
      telefone: { type: String, trim: true },
    },
    ubs_origem: {
      nome: { type: String, trim: true },
      acs_responsavel: { type: String, trim: true },
    },
    cid10: {
      type: String,
      trim: true,
    },
    profissional_responsavel: {
      nome: { type: String, trim: true },
      crm: { type: String, trim: true },
    },
    status_gestante: {
      type: String,
      enum: ['estavel', 'atencao', 'critico'],
      default: 'estavel',
    },
    data_retorno: {
      type: Date,
      default: Date.now,
    },

    // RELACIONAMENTO 1 - N COM ENCAMINHAMENTO
    // Uma contra-referência pertence a um encaminhamento
    referencia_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Referencia',
      required: true,
    },

    // RELACIONAMENTO 1 - N COM USUARIO
    // Uma contra-referência é registrada por um usuário
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContraRef', contraRefSchema);