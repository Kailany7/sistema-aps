const Gestante = require("../models/Gestante");
const Consulta = require("../models/Consulta");
const Referencia = require("../models/Referencia");
const Risco = require("../models/Risco");

const obterDados = async () => {
  const hoje = new Date();
  const inicioDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const fimDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);

  const totalGestantes = await Gestante.countDocuments();

  const consultasHoje = await Consulta.find({
    data: { $gte: inicioDia, $lt: fimDia },
  })
    .populate("gestante_id", "nome")
    .sort({ data: 1 })
    .lean();

  return {
    totalGestantes,
    consultasHoje: consultasHoje.length,
    consultasHojeLista: consultasHoje.map((c) => ({
      consultaId: c._id,
      gestanteNome: c.gestante_id?.nome,
      gestanteId: c.gestante_id?._id,
      data: c.data,
      tipo: c.tipo,
      profissional: c.profissional,
      semanaGestacional: c.semanaGestacional,
    })),
  };
};

module.exports = { obterDados };
