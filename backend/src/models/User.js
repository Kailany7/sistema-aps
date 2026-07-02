const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    login: {
      type: String,
      required: [true, 'Login é obrigatório'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    senha_hash: {
      type: String,
      required: [true, 'Senha é obrigatória'],
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    perfil: {
      type: String,
      required: [true, 'Perfil é obrigatório'],
      enum: ['medico', 'enfermeiro', 'municipio'],
    },
    unidade_saude: {
      type: String,
      required: [true, 'Unidade de saúde é obrigatória'],
      trim: true,
    },
    macro: { type: String, trim: true },
    municipio: { type: String, trim: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('senha_hash')) return next();
  this.senha_hash = await bcrypt.hash(this.senha_hash, 10);
  next();
});

userSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha_hash);
};

module.exports = mongoose.model('User', userSchema);
