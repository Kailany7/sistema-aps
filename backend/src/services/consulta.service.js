const Consulta = require("../models/Consulta");
const Gestante = require("../models/Gestante");

const listar = async () => {
  const consultas = await Consulta.find()
    .populate("gestante_id", "nome")
    .sort({ data: -1 });
  return consultas.map((c) => ({
    _id: c._id,
    gestante_id: c.gestante_id?._id,
    gestante_nome: c.gestante_id?.nome,
    data: c.data,
    tipo: c.tipo,
    profissional: c.profissional,
    semanaGestacional: c.semanaGestacional,
    peso: c.peso,
    pressaoArterial: c.pressaoArterial,
    observacoes: c.observacoes,
  }));
};

const criar = async (gestanteId, dados) => {
  const gestante = await Gestante.findById(gestanteId);
  if (!gestante) throw { status: 404, message: "Gestante não encontrada" };

  const consulta = await Consulta.create({ ...dados, gestante_id: gestanteId });
  gestante.consultas.push(consulta._id);
  await gestante.save();

  return {
    _id: consulta._id,
    gestante_id: gestanteId,
    gestante_nome: gestante.nome,
    data: consulta.data,
    tipo: consulta.tipo,
    profissional: consulta.profissional,
    semanaGestacional: consulta.semanaGestacional,
    peso: consulta.peso,
    pressaoArterial: consulta.pressaoArterial,
    observacoes: consulta.observacoes,
  };
};

const obter = async (id) => {
  const consulta = await Consulta.findById(id).populate("gestante_id", "nome");
  if (!consulta) throw { status: 404, message: "Consulta não encontrada" };

  return {
    _id: consulta._id,
    gestante_id: consulta.gestante_id?._id,
    gestante_nome: consulta.gestante_id?.nome,
    data: consulta.data,
    tipo: consulta.tipo,
    profissional: consulta.profissional,
    semanaGestacional: consulta.semanaGestacional,
    peso: consulta.peso,
    pressaoArterial: consulta.pressaoArterial,
    batimentosFetais: consulta.batimentosFetais,
    alturaUterina: consulta.alturaUterina,
    examesSolicitados: consulta.examesSolicitados,
    observacoes: consulta.observacoes,
  };
};

const atualizar = async (id, dados) => {
  const consulta = await Consulta.findByIdAndUpdate(id, dados, { new: true })
    .populate("gestante_id", "nome");
  if (!consulta) throw { status: 404, message: "Consulta não encontrada" };

  return {
    _id: consulta._id,
    gestante_id: consulta.gestante_id?._id,
    gestante_nome: consulta.gestante_id?.nome,
    data: consulta.data,
    tipo: consulta.tipo,
    profissional: consulta.profissional,
    semanaGestacional: consulta.semanaGestacional,
    peso: consulta.peso,
    pressaoArterial: consulta.pressaoArterial,
    batimentosFetais: consulta.batimentosFetais,
    alturaUterina: consulta.alturaUterina,
    examesSolicitados: consulta.examesSolicitados,
    observacoes: consulta.observacoes,
  };
};

module.exports = { listar, criar, obter, atualizar };
