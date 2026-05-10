const Referencia = require("../models/Referencia");

// POST /referencias
exports.create = async (req, res) => {
  try {
    const referencia = await Referencia.create({
      ...req.body,
      usuario_id: req.user.id,
    });
    res.status(201).json({ success: true, data: referencia });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /referencias
exports.findAll = async (req, res) => {
  try {
    const { status, dataInicio, dataFim, gestante_id } = req.query;

    const filtro = {};

    if (status) filtro.status = status;
    if (gestante_id) filtro.gestante_id = gestante_id;
    if (dataInicio || dataFim) {
      filtro.data_solicitacao = {};
      if (dataInicio) filtro.data_solicitacao.$gte = new Date(dataInicio);
      if (dataFim) filtro.data_solicitacao.$lte = new Date(dataFim);
    }

    const referencias = await Referencia.find(filtro)
      .populate("gestante_id", "nome cpf")
      .populate("usuario_id", "nome perfil")
      .sort({ data_solicitacao: -1 });

    res.json({ success: true, total: referencias.length, data: referencias });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /referencias/:id
exports.findById = async (req, res) => {
  try {
    const referencia = await Referencia.findById(req.params.id)
      .populate("gestante_id", "nome cpf telefone")
      .populate("usuario_id", "nome perfil");

    if (!referencia) {
      return res.status(404).json({ message: "Referência não encontrada" });
    }

    res.json({ success: true, data: referencia });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// PUT /referencias/:id
exports.update = async (req, res) => {
  try {
    const referencia = await Referencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!referencia) {
      return res.status(404).json({ message: "Referência não encontrada" });
    }

    res.json({ success: true, data: referencia });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /referencias/:id
exports.remove = async (req, res) => {
  try {
    const referencia = await Referencia.findByIdAndDelete(req.params.id);

    if (!referencia) {
      return res.status(404).json({ message: "Referência não encontrada" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
