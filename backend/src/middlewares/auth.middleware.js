const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token não fornecido" });
  try {
    const secret = process.env.JWT_SECRET || "sua_chave_secreta";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    if (req.user.perfil === "medico") {
      req.filtroAcesso = {};
    } else if (req.user.perfil === "enfermeiro") {
      req.filtroAcesso = { macro: req.user.macro };
    } else {
      req.filtroAcesso = { municipio: req.user.municipio };
    }

    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
};
