const dashboardService = require("../services/dashboard.service");

exports.getDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    res.status(200).json(dashboard);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao carregar dashboard",
    });
  }
};