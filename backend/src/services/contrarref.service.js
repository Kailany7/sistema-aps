const ContraRef = require("../models/Contrarref");
const Referencia = require("../models/Referencia");
const mongoose = require("mongoose");

// CREATE
exports.createContraRef = async (data, userId) => {
  const contraRef = await ContraRef.create({
    ...data,
    usuarioId: userId,
  });

  await Referencia.findByIdAndUpdate(data.referencia_id, {
    $set: { contrarref_id: contraRef._id },
  });

  return await ContraRef.findById(contraRef._id)
    .populate("referencia_id")
    .populate("usuarioId", "nome login");
};

// GET ALL
exports.getContraRefs = async (query) => {
  const { cid10, statusGestante, page = 1, limit = 10 } = query;

  const filtro = {};

  if (cid10) {
    filtro.cid10 = {
      $regex: cid10,
      $options: "i",
    };
  }

  if (statusGestante) {
    filtro.statusGestante = statusGestante;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [contraRefs, total] = await Promise.all([
    ContraRef.find(filtro)
      .populate("referencia_id")
      .populate("usuarioId", "nome login")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber),

    ContraRef.countDocuments(filtro),
  ]);

  return {
    total,
    page: pageNumber,
    data: contraRefs,
  };
};

// GET BY ID
exports.getContraRefById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const contraRef = await ContraRef.findById(id)
    .populate("referencia_id")
    .populate("usuarioId", "nome login");

  if (!contraRef) {
    throw new Error("Contra-referência não encontrada");
  }

  return contraRef;
};

// UPDATE
exports.updateContraRef = async (id, data) => {
  // valida ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const contraRef = await ContraRef.findByIdAndUpdate(id, data, {
    new: true, // retorna atualizado
    runValidators: true, // roda validações do schema
  });

  if (!contraRef) {
    throw new Error("Contra-referência não encontrada");
  }

  return contraRef;
};

// DELETE
exports.deleteContraRef = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const contraRef = await ContraRef.findByIdAndDelete(id);

  if (!contraRef) {
    throw new Error("Contra-referência não encontrada");
  }

  await Referencia.findByIdAndUpdate(contraRef.referencia_id, {
    $unset: { contrarref_id: "" },
  });

  return true;
};
