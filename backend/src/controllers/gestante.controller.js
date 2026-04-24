const service = require('../services/gestante.service');

// CREATE
exports.create = async (req, res) => {
  try {
    const gestante = await service.createGestante(req.body, req.user.id);

    res.status(201).json({ success: true, data: gestante });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL
exports.findAll = async (req, res) => {
  try {
    const result = await service.getGestantes(req.query);

    res.json({ success: true, ...result });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.findById = async (req, res) => {
  try {
    const gestante = await service.getGestanteById(req.params.id);

    res.json({ success: true, data: gestante });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const gestante = await service.updateGestante(req.params.id, req.body);

    res.json({ success: true, data: gestante });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    await service.deleteGestante(req.params.id);

    res.json({ success: true });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};