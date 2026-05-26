const Gestante = require('../models/Gestante');
// REGRAS DE NEGÓCIO — consultas
// 1. A gestante precisa existir antes de registrar consulta
// 2. Data da consulta é obrigatória
// 3. usuario_id vem do token JWT — quem registrou a consulta
// 4. Consultas ficam embutidas no array da gestante ($push)


const registrarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, tipo, profissional, peso, pressaoArterial, observacoes,
            semanaGestacional, batimentosFetais, alturaUterina, examesSolicitados } = req.body;

  
    if (!data) {
      return res.status(400).json({ erro: 'Data da consulta é obrigatória' });
    }

    // gestante precisa existir
    const gestante = await Gestante.findById(id);
    if (!gestante) {
      return res.status(404).json({ erro: 'Gestante não encontrada' });
    }

   
    const novaConsulta = {
      data,
      tipo,
      profissional,
      peso,
      pressaoArterial,
      observacoes,
      semanaGestacional,
      batimentosFetais,
      alturaUterina,
      examesSolicitados,
      usuario_id: req.user?.id || req.user?._id || null, // vem do token JWT
    };

    // adiciona a consulta no array da gestante
    gestante.consultas.push(novaConsulta);
    await gestante.save();

    res.status(201).json({
      mensagem: 'Consulta registrada com sucesso',
      consulta: gestante.consultas[gestante.consultas.length - 1],
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};


const listarConsultas = async (req, res) => {
  try {
    const { id } = req.params;

    const gestante = await Gestante.findById(id).select('consultas nome');
    if (!gestante) {
      return res.status(404).json({ erro: 'Gestante não encontrada' });
    }

    res.status(200).json({
      gestante: gestante.nome,
      total: gestante.consultas.length,
      consultas: gestante.consultas,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};


const editarConsulta = async (req, res) => {
  try {
    const { id, consultaId } = req.params;

    const gestante = await Gestante.findById(id);
    if (!gestante) {
      return res.status(404).json({ erro: 'Gestante não encontrada' });
    }

    // Busca a consulta dentro do array
    const consulta = gestante.consultas.id(consultaId);
    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }

    // Atualiza os campos que vieram no body
    const campos = ['data', 'tipo', 'profissional', 'peso', 'pressaoArterial',
                    'observacoes', 'semanaGestacional', 'batimentosFetais',
                    'alturaUterina', 'examesSolicitados'];

    campos.forEach(campo => {
      if (req.body[campo] !== undefined) {
        consulta[campo] = req.body[campo];
      }
    });

    await gestante.save();

    res.status(200).json({
      mensagem: 'Consulta atualizada com sucesso',
      consulta,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const removerConsulta = async (req, res) => {
  try {
    const { id, consultaId } = req.params;

    const gestante = await Gestante.findById(id);
    if (!gestante) {
      return res.status(404).json({ erro: 'Gestante não encontrada' });
    }

    const consulta = gestante.consultas.id(consultaId);
    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }

    // Remove a consulta do array
    consulta.deleteOne();
    await gestante.save();

    res.status(200).json({ mensagem: 'Consulta removida com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = { registrarConsulta, listarConsultas, editarConsulta, removerConsulta };