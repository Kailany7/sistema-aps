const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) throw { status: 409, message: "E-mail já cadastrado" };

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: "Credenciais inválidas" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: "Credenciais inválidas" };

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

module.exports = { register, login };
