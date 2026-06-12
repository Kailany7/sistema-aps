const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema(
  {
    gestante_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gestante",
      required: true,
    },
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

module.exports = mongoose.model("Consulta", consultaSchema);
