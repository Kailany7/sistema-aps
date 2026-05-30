const { Router } = require("express");
const referenciaController = require("../controllers/referencia.controller");

const router = Router();

router.get("/", referenciaController.listar);
router.get("/:id", referenciaController.obter);
router.post("/", referenciaController.criar);
router.put("/:id", referenciaController.atualizar);
router.delete("/:id", referenciaController.remover);

module.exports = router;
