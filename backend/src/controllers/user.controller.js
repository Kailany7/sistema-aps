const User = require('../models/User');


const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, login, senha, perfil, unidade_saude } = req.body;

    // Regra 1 — campos obrigatórios
    if (!nome || !login || !senha_hash || !perfil || !unidade_saude) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    // Regra 2 — perfil válido
    const perfisValidos = ['medico', 'enfermeiro', 'agente_saude'];
    if (!perfisValidos.includes(perfil)) {
      return res.status(400).json({
        erro: 'Perfil inválido. Use: medico, enfermeiro ou agente_saude',
      });
    }

    // Regra 3 — login único
    const usuarioExistente = await User.findOne({ login });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Login já cadastrado' });
    }

    // Cria o usuário — hash da senha feito automaticamente pelo schema
    const usuario = await User.create({
      nome,
      login,
      senha_hash: senha,
      perfil,
      unidade_saude,
    });

    // Regra 4 — nunca retornar a senha
    res.status(201).json({
      _id: usuario._id,
      nome: usuario.nome,
      login: usuario.login,
      perfil: usuario.perfil,
      unidade_saude: usuario.unidade_saude,
      createdAt: usuario.createdAt,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    // Regra 4 — remove senha_hash de todos os resultados
    const usuarios = await User.find().select('-senha_hash');
    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = { cadastrarUsuario, listarUsuarios };