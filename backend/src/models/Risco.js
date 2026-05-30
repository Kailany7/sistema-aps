const mongoose = require('mongoose');

const riscosSchema = new mongoose.Schema({
  valor: { type: String, required: true, unique: true, trim: true },
  rotulo: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Risco', riscosSchema);
