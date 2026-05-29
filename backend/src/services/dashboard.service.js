const Gestante = require("../models/Gestante");
const Referencia = require("../models/Referencia");

exports.getDashboard = async () => {
  const [
    totalGestantes,
    consultasRecentes,
    alertasRisco,
  ] = await Promise.all([
    Gestante.countDocuments(),

    Referencia.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Gestante.find({
      estratificacao_risco: "alto",
    })
      .select("nome cpf unidade_saude estratificacao_risco")
      .limit(10),
  ]);

  return {
    totalGestantes,
    consultasRecentes,
    alertasRisco,
  };
};