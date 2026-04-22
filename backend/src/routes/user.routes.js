const express = require('express');
const router = express.Router();
const { cadastrarUsuario, listarUsuarios } = require('../controllers/user.controller');

router.post('/', cadastrarUsuario);

router.get('/', listarUsuarios);

module.exports = router;