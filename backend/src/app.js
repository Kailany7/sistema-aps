const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const conectarBanco = require('./config/db');

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
const unidadeRoutes = require('./routes/unidade.routes');
const riscoRoutes = require('./routes/risco.routes');

app.use("/api/auth", authRoutes);
app.use("/api/gestantes", gestanteRoutes);
app.use("/api/referencias", referenciaRoutes);
app.use("/api/contrarreferencias", contrarrefRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/unidades', unidadeRoutes);
app.use('/api/riscos', riscoRoutes);

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
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;