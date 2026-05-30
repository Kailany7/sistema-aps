const { Router } = require("express");
const gestanteController = require("../controllers/gestante.controller");

const router = Router();

router.post("/", gestanteController.criar);
router.get("/", gestanteController.listar);
router.get("/:id", gestanteController.obter);
router.put("/:id", gestanteController.atualizar);
router.delete("/:id", gestanteController.remover);

module.exports = router;
