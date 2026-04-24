const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const conectarBanco = require('./config/db');
const { port } = require('./config/env');

const app = express();

// Conectar ao banco
conectarBanco();

app.use(cors());
app.use(express.json());

// ── Rotas ─────────────────────────────────────────────────────
const authRoutes = require("./routes/auth.routes");
const gestanteRoutes = require("./routes/gestante.routes");
const referenciaRoutes = require("./routes/referencia.routes");
const contrarrefRoutes = require("./routes/contrarref.routes");
const userRoutes = require('./routes/user.routes');

app.use("/auth", authRoutes);
app.use("/gestantes", gestanteRoutes);
app.use("/referencias", referenciaRoutes);
app.use("/contrarreferencias", contrarrefRoutes);
app.use('/usuarios', userRoutes);

// ── Swagger UI ────────────────────────────────────────────────
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Sistema APS — API Docs",
    swaggerOptions: { persistAuthorization: true },
  }),
);

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ── Health check ──────────────────────────────────────────────
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ✓`);
});

module.exports = app;