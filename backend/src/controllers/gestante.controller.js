const service = require('../services/gestante.service');

// CREATE
/*exports.create = async (req, res) => {
  try {
    const gestante = await service.createGestante(req.body, req.user.id);

    res.status(201).json({ success: true, data: gestante });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};*/

//create para testar sem token

exports.create = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    const gestante = await service.createGestante(
      req.body,
      userId
    );

    res.status(201).json({
      success: true,
      data: gestante,
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

// UPLOAD DE DOCUMENTOS
exports.uploadDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    // Regra 1 — arquivo precisa ter sido enviado
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    // Regra 2 — gestante precisa existir
    const Gestante = require('../models/Gestante');
    const gestante = await Gestante.findById(id);
    if (!gestante) {
      return res.status(404).json({ erro: 'Gestante não encontrada' });
    }

    // Monta o objeto do documento
    const novoDocumento = {
      nome: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      tipo: req.file.mimetype,
      enviadoEm: new Date()
    };

    // Adiciona o documento no array da gestante
    gestante.documentos.push(novoDocumento);
    await gestante.save();

    res.status(201).json({
      mensagem: 'Documento enviado com sucesso',
      documento: novoDocumento
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};