const { Router } = require("express");
const router = Router();
const referenciaController = require("../controllers/referencia.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.post("/", referenciaController.create);
router.get("/", referenciaController.findAll);
router.get("/:id", referenciaController.findById);
router.put("/:id", referenciaController.update);
router.delete("/:id", referenciaController.remove);

module.exports = router;
