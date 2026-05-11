const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async ({ login, senha }) => {
  const user = await User.findOne({ login });
  if (!user) throw { status: 401, message: "Credenciais inválidas" };

  const valid = await user.compararSenha(senha);
  if (!valid) throw { status: 401, message: "Credenciais inválidas" };

  const token = jwt.sign(
    { id: user._id, perfil: user.perfil },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: user._id,
      nome: user.nome,
      login: user.login,
      perfil: user.perfil,
      unidade_saude: user.unidade_saude,
    },
  };
};

module.exports = { login };
