const referenciaService = require("../services/referencia.service");

const criar = async (req, res) => {
  try {
    const ref = await referenciaService.criar(req.body);
    res.status(201).json(ref);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const listar = async (req, res) => {
  try {
    const refs = await referenciaService.listar();
    res.json(refs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obter = async (req, res) => {
  try {
    const ref = await referenciaService.obter(req.params.id);
    res.json(ref);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const ref = await referenciaService.atualizar(req.params.id, req.body);
    res.json(ref);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const remover = async (req, res) => {
  try {
    await referenciaService.remover(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { criar, listar, obter, atualizar, remover };
