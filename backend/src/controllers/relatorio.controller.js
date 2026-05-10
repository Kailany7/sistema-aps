const service = require("../services/relatorio.service");

// GET /relatorios/gestantes
exports.relatorioGestantes = async (req, res) => {
  try {
    const result = await service.relatorioGestantes(req.query);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /relatorios/encaminhamentos
exports.relatorioEncaminhamentos = async (req, res) => {
  try {
    const result = await service.relatorioEncaminhamentos(req.query);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
