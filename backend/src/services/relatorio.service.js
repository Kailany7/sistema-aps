const Gestante = require("../models/Gestante");
const Referencia = require("../models/Referencia");

// GET /relatorios/gestantes
// Total por risco e por UBS
exports.relatorioGestantes = async (query) => {
  const { unidadeSaude, dataInicio, dataFim } = query;

  const filtro = {};
  if (unidadeSaude)
    filtro.unidadeSaude = { $regex: unidadeSaude, $options: "i" };
  if (dataInicio || dataFim) {
    filtro.createdAt = {};
    if (dataInicio) filtro.createdAt.$gte = new Date(dataInicio);
    if (dataFim) filtro.createdAt.$lte = new Date(dataFim);
  }

  const [totalGeral, porRisco, porUbs] = await Promise.all([
    // Total geral
    Gestante.countDocuments(filtro),

    // Agrupado por estratificacaoRisco
    Gestante.aggregate([
      { $match: filtro },
      {
        $group: {
          _id: "$estratificacaoRisco",
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]),

    // Agrupado por unidadeSaude
    Gestante.aggregate([
      { $match: filtro },
      {
        $group: {
          _id: "$unidadeSaude",
          total: { $sum: 1 },
          altoRisco: {
            $sum: { $cond: [{ $eq: ["$estratificacaoRisco", "alto"] }, 1, 0] },
          },
          medioRisco: {
            $sum: { $cond: [{ $eq: ["$estratificacaoRisco", "medio"] }, 1, 0] },
          },
          baixoRisco: {
            $sum: { $cond: [{ $eq: ["$estratificacaoRisco", "baixo"] }, 1, 0] },
          },
          habitual: {
            $sum: {
              $cond: [{ $eq: ["$estratificacaoRisco", "habitual"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { total: -1 } },
    ]),
  ]);

  return {
    totalGeral,
    porRisco,
    porUbs,
  };
};

// GET /relatorios/encaminhamentos
// Encaminhamentos por período, por status e por especialidade
exports.relatorioEncaminhamentos = async (query) => {
  const { dataInicio, dataFim, status, especialidade } = query;

  const filtro = {};
  if (status) filtro.status = status;
  if (especialidade)
    filtro.especialidade = { $regex: especialidade, $options: "i" };
  if (dataInicio || dataFim) {
    filtro.data_solicitacao = {};
    if (dataInicio) filtro.data_solicitacao.$gte = new Date(dataInicio);
    if (dataFim) filtro.data_solicitacao.$lte = new Date(dataFim);
  }

  const [totalGeral, porStatus, porEspecialidade, porPeriodo] =
    await Promise.all([
      // Total geral
      Referencia.countDocuments(filtro),

      // Agrupado por status
      Referencia.aggregate([
        { $match: filtro },
        {
          $group: {
            _id: "$status",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
      ]),

      // Agrupado por especialidade
      Referencia.aggregate([
        { $match: filtro },
        {
          $group: {
            _id: "$especialidade",
            total: { $sum: 1 },
            pendentes: {
              $sum: { $cond: [{ $eq: ["$status", "pendente"] }, 1, 0] },
            },
            realizados: {
              $sum: { $cond: [{ $eq: ["$status", "realizado"] }, 1, 0] },
            },
          },
        },
        { $sort: { total: -1 } },
      ]),

      // Agrupado por mês/ano
      Referencia.aggregate([
        { $match: filtro },
        {
          $group: {
            _id: {
              ano: { $year: "$data_solicitacao" },
              mes: { $month: "$data_solicitacao" },
            },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id.ano": 1, "_id.mes": 1 } },
      ]),
    ]);

  return {
    totalGeral,
    porStatus,
    porEspecialidade,
    porPeriodo,
  };
};
