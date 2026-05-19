const { Router } = require("express");
const router = Router();

const gestanteController = require("../controllers/gestante.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// =========================
// ROTAS GESTANTE
// =========================

router.use(authMiddleware);

router.post("/", gestanteController.create);
router.get("/", gestanteController.findAll);
router.get("/:id", gestanteController.findById);
router.put("/:id", gestanteController.update);
router.delete("/:id", gestanteController.remove);

module.exports = router;