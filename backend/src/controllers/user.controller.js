const User = require('../models/User');

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, login, senha_hash, perfil, unidade_saude } = req.body;

    const usuarioExistente = await User.findOne({ login });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Login já cadastrado' });
    }

    const usuario = await User.create({
      nome,
      login,
      senha_hash,
      perfil,
      unidade_saude,
    });

    res.status(201).json({
      _id: usuario._id,
      nome: usuario.nome,
      login: usuario.login,
      perfil: usuario.perfil,
      unidade_saude: usuario.unidade_saude,
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};


const listarUsuarios = async (req, res) => {
  try {
    // .select('-senha_hash') remove a senha da resposta
    const usuarios = await User.find().select('-senha_hash');
    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = { cadastrarUsuario, listarUsuarios };