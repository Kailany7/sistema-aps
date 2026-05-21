const { Router } = require("express");
const unidadeController = require("../controllers/unidade.controller");

const router = Router();

router.get("/", unidadeController.listar);

module.exports = router;
