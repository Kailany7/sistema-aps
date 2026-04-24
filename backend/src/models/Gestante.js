
const mongoose = require('mongoose');

// Sub-schema de Consulta — fica embutido dentro da Gestante
// Não é uma coleção separada, é um array dentro do documento
const consultaSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      required: [true, 'Data da consulta é obrigatória'],
    },
    tipo: {
      type: String,
      trim: true,
    },
    profissional: {
      type: String,
      trim: true,
    },
    semana_gestacional: {
      type: Number,
    },
    peso: {
      type: Number,
    },
    pressao_arterial: {
      type: String,
      trim: true,
    },
    batimentos_fetais: {
      type: Number,
    },
    altura_uterina: {
      type: Number,
    },
    exames_solicitados: [{ type: String, trim: true }],
    observacoes: {
      type: String,
      trim: true,
    },

    // RELACIONAMENTO 1 - N COM USUARIO
    // Uma consulta é registrada por um usuário (profissional de saúde)
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const gestanteSchema = new mongoose.Schema(
  {
    //  Dados pessoais
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    cpf: {
      type: String,
      required: [true, 'CPF é obrigatório'],
      unique: true,
      trim: true,
    },
    data_nascimento: {
      type: Date,
      required: [true, 'Data de nascimento é obrigatória'],
    },
    telefone: {
      type: String,
      required: [true, 'Telefone é obrigatório'],
      trim: true,
    },
    telefone_secundario: {
      type: String,
      trim: true,
    },
    endereco: {
      type: String,
      trim: true,
    },
    numero_cartao_sus: {
      type: String,
      trim: true,
    },

    // Dados da gestação
    semanas_gestacao: {
      type: Number,
      required: [true, 'Semanas de gestação são obrigatórias'],
    },
    data_ultima_menstruacao: {
      type: Date,
    },
    data_provavel_parto: {
      type: Date,
    },
    num_gestacoes: {
      type: Number,
      default: 0,
    },
    num_partos: {
      type: Number,
      default: 0,
    },
    num_abortos: {
      type: Number,
      default: 0,
    },

    // Dados clínicos
    resumo_clinico: {
      type: String,
      trim: true,
    },
    historico_doencas: {
      type: String,
      trim: true,
    },
    estratificacao_risco: {
      type: String,
      enum: ['alto', 'medio', 'habitual', 'baixo'],
      default: 'habitual',
    },

    // Unidade de saúde
    unidade_saude: {
      type: String,
      required: [true, 'Unidade de saúde é obrigatória'],
      trim: true,
    },
    profissional_responsavel: {
      type: String,
      trim: true,
    },

    //Documentos anexados (preenchido pelo multer) 
    documentos: [
      {
        nome: { type: String, trim: true },
        url: { type: String, trim: true },
        tipo: { type: String, trim: true },
        enviado_em: { type: Date, default: Date.now },
      },
    ],

    // RELACIONAMENTO 1 - N COM USUARIO
    // Uma gestante é cadastrada por um usuário (profissional de saúde)
    // O usuario_id vem do token JWT após o login
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // RELACIONAMENTO 1 - N COM CONSULTA (EMBUTIDO)
    // Uma gestante tem muitas consultas
    // As consultas ficam dentro do documento da gestante como array
    // Não precisa buscar em outra coleção — já vem junto
    consultas: [consultaSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gestante', gestanteSchema);