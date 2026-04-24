const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
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
    ref: 'User',
  }
}, { timestamps: true });

const gestanteSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },

  cpf: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{11}$/, 'CPF deve conter 11 números']
  },

  dataNascimento: { type: Date, required: true },

  telefone: { type: String, required: true },
  telefoneSecundario: String,
  endereco: String,
  numeroCartaoSus: String,

  semanasGestacao: { type: Number, required: true },
  dataUltimaMenstruacao: Date,
  dataProvavelParto: Date,

  numGestacoes: { type: Number, default: 0 },
  numPartos: { type: Number, default: 0 },
  numAbortos: { type: Number, default: 0 },

  resumoClinico: String,
  historicoDoencas: String,

  estratificacaoRisco: {
    type: String,
    enum: ['alto', 'medio', 'baixo', 'habitual'],
    default: 'habitual'
  },

  unidadeSaude: { type: String, required: true },
  profissionalResponsavel: String,

  documentos: [
    {
      nome: String,
      url: String,
      tipo: String,
      enviadoEm: { type: Date, default: Date.now }
    }
  ],

  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  consultas: [consultaSchema]

}, { timestamps: true });

module.exports = mongoose.model('Gestante', gestanteSchema);