const service = require('../services/contrarref.service');

// CREATE
exports.create = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    const contraRef = await service.createContraRef(
      req.body,
      userId
    );

    res.status(201).json({
      success: true,
      data: contraRef,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL
exports.findAll = async (req, res) => {
  try {
    const result = await service.getContraRefs(req.query);

    res.json({
      success: true,
      ...result,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET BY ID
exports.findById = async (req, res) => {
  try {
    const contraRef = await service.getContraRefById(req.params.id);

    res.json({
      success: true,
      data: contraRef,
    });

  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const contraRef = await service.updateContraRef(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: contraRef,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    await service.deleteContraRef(req.params.id);

    res.json({
      success: true,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};