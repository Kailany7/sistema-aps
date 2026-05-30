const gestanteService = require("../services/gestante.service");

const criar = async (req, res) => {
  try {
    const gestante = await gestanteService.criar(req.body);
    res.status(201).json(gestante);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const listar = async (req, res) => {
  try {
    const gestantes = await gestanteService.listar(req.query);
    res.json(gestantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obter = async (req, res) => {
  try {
    const gestante = await gestanteService.obter(req.params.id);
    res.json(gestante);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const gestante = await gestanteService.atualizar(req.params.id, req.body);
    res.json(gestante);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const remover = async (req, res) => {
  try {
    await gestanteService.remover(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { criar, listar, obter, atualizar, remover };
