const { Router } = require("express");
const router = Router();
const relatorioController = require("../controllers/relatorio.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.get("/gestantes", relatorioController.relatorioGestantes);
router.get("/encaminhamentos", relatorioController.relatorioEncaminhamentos);

module.exports = router;
