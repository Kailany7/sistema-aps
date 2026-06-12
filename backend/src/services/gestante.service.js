const Gestante = require("../models/Gestante");
const Risco = require("../models/Risco");

async function mapearDados(body) {
  const dados = {
    nome: body.nome,
    cpf: body.cpf,
    data_nascimento: body.dataNasc,
    telefone: body.telefone,
    endereco: body.endereco,
    unidade_saude: body.unidade,
    profissional_responsavel: body.profissional || "",
  };

  if (body.telSecundario) dados.telefone_secundario = body.telSecundario;
  if (body.semanas) dados.semanas_gestacao = body.semanas;
  if (body.dum) dados.data_ultima_menstruacao = body.dum;
  if (body.dpp) dados.data_provavel_parto = body.dpp;
  if (body.gestacoes) dados.num_gestacoes = body.gestacoes;
  if (body.partos) dados.num_partos = body.partos;
  if (body.abortos) dados.num_abortos = body.abortos;
  if (body.resumoClinico) dados.resumoClinico = body.resumoClinico;
  if (body.historicoDoencas) dados.historicoDoencas = body.historicoDoencas;
  if (body.risco) {
    const risco = await Risco.findById(body.risco);
    if (risco) dados.estratificacaoRisco = risco._id;
  }

  return dados;
}

const criar = async (dados) => {
  const existente = await Gestante.findOne({ cpf: dados.cpf });
  if (existente) throw { status: 409, message: "CPF já cadastrado" };

  const gestante = await Gestante.create(await mapearDados(dados));
  return gestante;
};

const listar = async (filtros = {}) => {
  const query = {};
  if (filtros.nome) query.nome = { $regex: filtros.nome, $options: "i" };
  if (filtros.risco) query.estratificacaoRisco = filtros.risco;
  return Gestante.find(query).populate("referencias").populate("estratificacaoRisco");
};

const obter = async (id) => {
  const gestante = await Gestante.findById(id).populate("referencias").populate("estratificacaoRisco");
  if (!gestante) throw { status: 404, message: "Gestante não encontrada" };
  return gestante;
};

const atualizar = async (id, dados) => {
  const gestante = await Gestante.findById(id);
  if (!gestante) throw { status: 404, message: "Gestante não encontrada" };

  Object.assign(gestante, await mapearDados(dados));
  return gestante.save();
};

const remover = async (id) => {
  const gestante = await Gestante.findByIdAndDelete(id);
  if (!gestante) throw { status: 404, message: "Gestante não encontrada" };
  return gestante;
};

module.exports = { criar, listar, obter, atualizar, remover };
