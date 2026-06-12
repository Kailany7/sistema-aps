const Gestante = require("../models/Gestante");
const Consulta = require("../models/Consulta");
const Referencia = require("../models/Referencia");
const Risco = require("../models/Risco");

const obterDados = async () => {
  const hoje = new Date();

  const riscoAlto = await Risco.findOne({ valor: "Alto" });

  const totalGestantes = await Gestante.countDocuments();

  const altoRisco = await Gestante.countDocuments({
    estratificacaoRisco: riscoAlto?._id,
  });

  const consultasRecentes = await Consulta.find()
    .populate("gestante_id", "nome")
    .sort({ data: -1 })
    .limit(10)
    .lean();

  const consultasAgendadas = await Consulta.countDocuments({
    data: { $gte: hoje },
  });

  const alertasRisco = await Gestante.find(
    { estratificacaoRisco: riscoAlto?._id },
    { nome: 1, cpf: 1, semanas_gestacao: 1, unidade_saude: 1, estratificacaoRisco: 1 },
  ).populate("estratificacaoRisco").sort({ updatedAt: -1 }).limit(10);

  return {
    totalGestantes,
    altoRisco,
    consultasAgendadas,
    consultasRecentes: consultasRecentes.map((c) => ({
      consultaId: c._id,
      gestanteNome: c.gestante_id?.nome,
      gestanteId: c.gestante_id?._id,
      data: c.data,
      tipo: c.tipo,
      profissional: c.profissional,
      semanaGestacional: c.semanaGestacional,
    })),
    alertasRisco,
  };
};

module.exports = { obterDados };
