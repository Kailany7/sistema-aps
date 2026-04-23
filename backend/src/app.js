const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());

// ── Swagger UI ────────────────────────────────────────────────
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Sistema APS — API Docs",
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

// Endpoint para retornar o JSON do spec (útil para importar no Insomnia/Postman)
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ── Rotas ─────────────────────────────────────────────────────
const authRoutes = require("./routes/auth.routes");
const gestanteRoutes = require("./routes/gestante.routes");
const referenciaRoutes = require("./routes/referencia.routes");
const contrarrefRoutes = require("./routes/contrarref.routes");

app.use("/auth", authRoutes);
app.use("/gestantes", gestanteRoutes);
app.use("/referencias", referenciaRoutes);
app.use("/contrarreferencias", contrarrefRoutes);

// ── Health check ──────────────────────────────────────────────
app.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;
const express = require('express');
const cors = require('cors');
const conectarBanco = require('./config/db');
const { port } = require('./config/env');

const app = express();

conectarBanco();

// Middlewares
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ mensagem: 'API Gestão de Alto Risco funcionando' });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ✓`);
});

module.exports = app;
