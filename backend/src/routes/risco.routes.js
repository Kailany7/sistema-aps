const { Router } = require("express");
const riscoController = require("../controllers/risco.controller");

const router = Router();

router.get("/", riscoController.listar);

module.exports = router;
