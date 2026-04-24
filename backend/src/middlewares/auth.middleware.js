const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token não fornecido" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // <- usuario_id fica disponível aqui
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
};

// Como usar nas rotas da Kailany e Leticia:
const auth = require("../middleware/auth");
router.post("/gestantes", auth, async (req, res) => {
  const usuario_id = req.user.id; // <- pega o id de quem está logado
  // ...
});
