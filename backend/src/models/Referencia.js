const mongoose = require('mongoose');

const referenciaSchema = new mongoose.Schema(
  {
    especialidade: {
      type: String,
      required: [true, 'Especialidade é obrigatória'],
      trim: true,
    },
    motivo: {
      type: String,
      trim: true,
    },
    estratificacao_risco: {
      type: String,
      trim: true,
    },
    cid10: {
      type: String,
      trim: true,
    },
    profissional_encaminhador: {
      nome: { type: String, trim: true },
      crm: { type: String, trim: true },
    },
    medico_atendente: {
      nome: { type: String, trim: true },
      crm: { type: String, trim: true },
    },
    ubs_origem: {
      nome: { type: String, trim: true },
      acs_responsavel: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ['pendente', 'agendado', 'realizado','cancelado'],
      default: 'pendente',
    },
    data_solicitacao: {
      type: Date,
      default: Date.now,
    },
    data_consulta: {
      type: Date,
    },
    arquivos: [
      {
        nome: { type: String, trim: true },
        url: { type: String, trim: true },
      },
    ],

    // RELACIONAMENTO 1 - N COM GESTANTE
    gestante_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gestante',
      required: true,
    },

    // RELACIONAMENTO 1 - N COM USUARIO
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // RELACIONAMENTO 1 - 1 COM CONTRA-REFERENCIA
    contrarref_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContraRef',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Referencia', referenciaSchema);