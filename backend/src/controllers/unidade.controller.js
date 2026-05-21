const UnidadeSaude = require('../models/UnidadeSaude');

const listar = async (req, res) => {
  try {
    const unidades = await UnidadeSaude.find().sort({ nome: 1 });
    res.json(unidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listar };
