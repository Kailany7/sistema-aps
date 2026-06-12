const consultaService = require("../services/consulta.service");

const listar = async (req, res) => {
  try {
    const consultas = await consultaService.listar();
    res.json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const criar = async (req, res) => {
  try {
    const { gestanteId, ...dados } = req.body;
    if (!gestanteId) return res.status(400).json({ error: "gestanteId é obrigatório" });
    const consulta = await consultaService.criar(gestanteId, dados);
    res.status(201).json(consulta);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const obter = async (req, res) => {
  try {
    const consulta = await consultaService.obter(req.params.id);
    res.json(consulta);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const consulta = await consultaService.atualizar(req.params.id, req.body);
    res.json(consulta);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { listar, criar, obter, atualizar };
