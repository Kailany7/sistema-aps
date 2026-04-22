const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    };
  }

  async register(data) {
    const userExists = await User.findOne({ email: data.email });
    
    if (userExists) {
      throw new Error('Email já cadastrado');
    }

    const user = await User.create(data);
    return { id: user._id, name: user.name, email: user.email };
  }
}

module.exports = AuthService;