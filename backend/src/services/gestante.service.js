const Gestante = require('../models/Gestante');
const mongoose = require('mongoose');

// CREATE
exports.createGestante = async (data, userId) => {
  return await Gestante.create({
    ...data,
    usuario_id: userId
  });
};

// GET ALL 
exports.getGestantes = async (query) => {
  const {
    nome,
    cpf,
    estratificacaoRisco,
    unidadeSaude,
    page = 1,
    limit = 10
  } = query;

  const filtro = {};

  if (nome) filtro.nome = { $regex: nome, $options: 'i' };
  if (cpf) filtro.cpf = cpf;
  if (estratificacaoRisco) filtro.estratificacaoRisco = estratificacaoRisco;
  if (unidadeSaude) filtro.unidadeSaude = unidadeSaude;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const [gestantes, total] = await Promise.all([
    Gestante.find(filtro)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber),

    Gestante.countDocuments(filtro)
  ]);

  return {
    total,
    page: pageNumber,
    data: gestantes
  };
};

// GET BY ID
exports.getGestanteById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }

  const gestante = await Gestante.findById(id);

  if (!gestante) {
    throw new Error('Gestante não encontrada');
  }

  return gestante;
};

// UPDATE
exports.updateGestante = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }

  const gestante = await Gestante.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );

  if (!gestante) {
    throw new Error('Gestante não encontrada');
  }

  return gestante;
};

// DELETE
exports.deleteGestante = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }

  const gestante = await Gestante.findByIdAndDelete(id);

  if (!gestante) {
    throw new Error('Gestante não encontrada');
  }

  return true;
};