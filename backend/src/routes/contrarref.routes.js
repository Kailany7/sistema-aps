const { Router } = require('express');
const router = Router();

const contrarrefController = require('../controllers/contrarref.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// =========================
// ROTAS CONTRARREFERÊNCIA
// =========================

// Middleware de autenticação
// Descomente quando for validar JWT
// router.use(authMiddleware);

// CREATE
router.post('/', contrarrefController.create);

// GET ALL
router.get('/', contrarrefController.findAll);

// GET BY ID
router.get('/:id', contrarrefController.findById);

// UPDATE
router.put('/:id', contrarrefController.update);

// DELETE
router.delete('/:id', contrarrefController.remove);

module.exports = router;