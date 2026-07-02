const gestanteService = require("../services/gestante.service");

const criar = async (req, res) => {
  try {
    const gestante = await gestanteService.criar({ ...req.body, usuario_id: req.user?.id });
    res.status(201).json(gestante);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const listar = async (req, res) => {
  try {
    const gestantes = await gestanteService.listar(req.query, req.filtroAcesso);
    res.json(gestantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obter = async (req, res) => {
  try {
    const gestante = await gestanteService.obter(req.params.id, req.filtroAcesso);
    res.json(gestante);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const gestante = await gestanteService.atualizar(req.params.id, req.body, req.filtroAcesso);
    res.json(gestante);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const remover = async (req, res) => {
  try {
    await gestanteService.remover(req.params.id, req.filtroAcesso);
    res.status(204).end();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { criar, listar, obter, atualizar, remover };
