const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

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
