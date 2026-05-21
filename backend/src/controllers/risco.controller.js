const Risco = require('../models/Risco');

const listar = async (req, res) => {
  try {
    const riscos = await Risco.find().sort({ valor: 1 });
    res.json(riscos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listar };
