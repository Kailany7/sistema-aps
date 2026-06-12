const { Router } = require("express");
const consultaController = require("../controllers/consulta.controller");

const router = Router();

router.get("/", consultaController.listar);
router.get("/:id", consultaController.obter);
router.post("/", consultaController.criar);
router.put("/:id", consultaController.atualizar);

module.exports = router;
