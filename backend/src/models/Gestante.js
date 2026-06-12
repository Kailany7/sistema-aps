const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema(
  {
    data: { type: Date, required: true },
    tipo: String,
    profissional: String,
    semanaGestacional: Number,
    peso: Number,
    pressaoArterial: String,
    batimentosFetais: Number,
    alturaUterina: Number,
    examesSolicitados: [String],
    observacoes: String,
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

// DADOS PESSOAIS
const gestanteSchema = new mongoose.Schema(
  {
    // Dados pessoais
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    cpf: {
      type: String,
      required: [true, "CPF é obrigatório"],
      unique: true,
      trim: true,
    },
    data_nascimento: {
      type: Date,
      required: [true, "Data de nascimento é obrigatória"],
    },
    telefone: {
      type: String,
      required: [true, "Telefone é obrigatório"],
      trim: true,
    },
    telefone_secundario: {
      type: String,
      trim: true,
    },
    endereco: {
      type: String,
      required: [true, "Endereço é obrigatório"],
      trim: true,
    },
    numero_cartao_sus: {
      type: String,
      trim: true,
    },
    semanas_gestacao: {
      type: Number,
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
    unidade_saude: {
      type: String,
      required: [true, "Unidade de saúde é obrigatória"],
      trim: true,
    },
    profissional_responsavel: {
      type: String,
      required: [true, "Profissional responsável é obrigatório"],
      trim: true,
    },
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resumoClinico: String,
    historicoDoencas: String,
    estratificacaoRisco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Risco",
    },
    documentos: [
      {
        nome: String,
        url: String,
        tipo: String,
        enviadoEm: { type: Date, default: Date.now },
      },
    ],
    consultas: [consultaSchema],
    referencias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Referencia",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Gestante", gestanteSchema);
