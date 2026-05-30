const Referencia = require("../models/Referencia");
const Gestante = require("../models/Gestante");

const mapRisco = {
  Baixo: "baixo",
  Intermediário: "medio",
  Alto: "alto",
};

const mapRiscoReverso = {
  baixo: "Baixo",
  medio: "Intermediário",
  alto: "Alto",
};

function formatarSaida(ref) {
  const obj = ref.toObject ? ref.toObject() : ref;
  const g = obj.gestante_id || {};
  return {
    id: obj._id,
    _id: obj._id,
    nome: g.nome || "",
    cpf: g.cpf || "",
    dataNasc: g.data_nascimento || "",
    idade: g.data_nascimento ? calcularIdade(g.data_nascimento) : "",
    peso: g.peso || "",
    altura: g.altura || "",
    telefone: g.telefone || "",
    endereco: g.endereco || "",
    cidade: g.cidade || "",
    unidade: g.unidade_saude || obj.ubs_origem?.nome || "",
    acs: obj.ubs_origem?.acs_responsavel || "",
    risco: mapRiscoReverso[g.estratificacao_risco] || obj.estratificacao_risco || "",
    classificacao: obj.estratificacao_risco || mapRiscoReverso[g.estratificacao_risco] || "",
    destino: obj.especialidade || "",
    dataEncaminhamento: obj.data_solicitacao ? new Date(obj.data_solicitacao).toLocaleDateString("pt-BR") : "",
    resumo: obj.motivo || "",
    observacoes: "",
    especialidade: obj.especialidade || "",
    status: obj.status || "pendente",
  };
}

function calcularIdade(dataNasc) {
  if (!dataNasc) return "";
  const nasc = new Date(dataNasc);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mes = hoje.getMonth() - nasc.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

const criar = async (dados) => {
  const ref = await Referencia.create({
    especialidade: dados.especialidade,
    motivo: dados.motivo,
    estratificacao_risco: dados.classificacao || dados.estratificacao_risco,
    cid10: dados.cid10,
    profissional_encaminhador: dados.profissional_encaminhador,
    ubs_origem: dados.ubs_origem,
    gestante_id: dados.gestante_id,
    usuario_id: dados.usuario_id,
  });

  await Gestante.findByIdAndUpdate(dados.gestante_id, {
    $push: { referencias: ref._id },
  });

  return formatarSaida(await Referencia.findById(ref._id).populate("gestante_id"));
};

const listar = async () => {
  const refs = await Referencia.find().populate("gestante_id").sort({ data_solicitacao: -1 });
  return refs.map(formatarSaida);
};

const obter = async (id) => {
  const ref = await Referencia.findById(id).populate("gestante_id");
  if (!ref) throw { status: 404, message: "Encaminhamento não encontrado" };
  return formatarSaida(ref);
};

const atualizar = async (id, dados) => {
  const ref = await Referencia.findById(id);
  if (!ref) throw { status: 404, message: "Encaminhamento não encontrado" };

  if (dados.especialidade) ref.especialidade = dados.especialidade;
  if (dados.motivo) ref.motivo = dados.motivo;
  if (dados.estratificacao_risco) ref.estratificacao_risco = dados.estratificacao_risco;
  if (dados.cid10) ref.cid10 = dados.cid10;
  if (dados.status) ref.status = dados.status;
  if (dados.profissional_encaminhador) ref.profissional_encaminhador = dados.profissional_encaminhador;
  if (dados.ubs_origem) ref.ubs_origem = dados.ubs_origem;

  await ref.save();
  return formatarSaida(await Referencia.findById(ref._id).populate("gestante_id"));
};

const remover = async (id) => {
  const ref = await Referencia.findByIdAndDelete(id);
  if (!ref) throw { status: 404, message: "Encaminhamento não encontrado" };

  await Gestante.findByIdAndUpdate(ref.gestante_id, {
    $pull: { referencias: ref._id },
  });

  return ref;
};

module.exports = { criar, listar, obter, atualizar, remover };
