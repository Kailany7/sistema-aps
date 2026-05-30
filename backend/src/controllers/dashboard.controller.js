const dashboardService = require("../services/dashboard.service");

const obter = async (req, res) => {
  try {
    const dados = await dashboardService.obterDados();
    res.json({ success: true, data: dados });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { obter };
