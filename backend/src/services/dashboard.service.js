const Gestante = require("../models/Gestante");
const Referencia = require("../models/Referencia");

const obterDados = async () => {
  const hoje = new Date();

  const totalGestantes = await Gestante.countDocuments();

  const altoRisco = await Gestante.countDocuments({
    estratificacaoRisco: "alto",
  });

  const consultasRecentes = await Gestante.aggregate([
    { $unwind: "$consultas" },
    { $sort: { "consultas.data": -1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 0,
        gestanteNome: "$nome",
        gestanteId: "$_id",
        data: "$consultas.data",
        tipo: "$consultas.tipo",
        profissional: "$consultas.profissional",
        semanaGestacional: "$consultas.semanaGestacional",
      },
    },
  ]);

  const consultasAgendadas = await Gestante.aggregate([
    { $unwind: "$consultas" },
    { $match: { "consultas.data": { $gte: hoje } } },
    { $count: "total" },
  ]);

  const alertasRisco = await Gestante.find(
    { estratificacaoRisco: "alto" },
    { nome: 1, cpf: 1, semanas_gestacao: 1, unidade_saude: 1, estratificacaoRisco: 1 },
  ).sort({ updatedAt: -1 }).limit(10);

  return {
    totalGestantes,
    altoRisco,
    consultasAgendadas: consultasAgendadas[0]?.total || 0,
    consultasRecentes,
    alertasRisco,
  };
};

module.exports = { obterDados };
