const { Router } = require("express");
const router = Router();

const gestanteController = require("../controllers/gestante.controller");
const consultaController = require("../controllers/consulta.controller");
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

//rotas consultas
router.post("/:id/consultas", consultaController.registrarConsulta);
router.get("/:id/consultas", consultaController.listarConsultas);
router.put("/:id/consultas/:consultaId", consultaController.editarConsulta);
router.delete("/:id/consultas/:consultaId", consultaController.removerConsulta);


module.exports = router;