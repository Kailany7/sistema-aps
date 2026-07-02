const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = () => process.env.JWT_SECRET || "sua_chave_secreta";

const register = async ({ nome, login, senha, perfil, unidade_saude, macro, municipio }) => {
  const exists = await User.findOne({ login });
  if (exists) throw { status: 409, message: "Login já cadastrado" };

  const user = await User.create({ nome, login, senha_hash: senha, perfil, unidade_saude, macro, municipio });

  const token = jwt.sign(
    { id: user._id, perfil: user.perfil, macro: user.macro, municipio: user.municipio },
    JWT_SECRET(),
    { expiresIn: "7d" },
  );

  return {
    token,
    user: { id: user._id, nome: user.nome, login: user.login, perfil: user.perfil, macro: user.macro, municipio: user.municipio },
  };
};

const login = async ({ login, senha }) => {
  const user = await User.findOne({ login });
  if (!user) throw { status: 401, message: "Credenciais inválidas" };

  if (!user.ativo) throw { status: 401, message: "Usuário desativado" };

  const valid = await user.compararSenha(senha);
  if (!valid) throw { status: 401, message: "Credenciais inválidas" };

  const token = jwt.sign(
    { id: user._id, perfil: user.perfil, macro: user.macro, municipio: user.municipio },
    JWT_SECRET(),
    { expiresIn: "7d" },
  );

  return {
    token,
    user: { id: user._id, nome: user.nome, login: user.login, perfil: user.perfil, macro: user.macro, municipio: user.municipio },
  };
};

module.exports = { register, login };
