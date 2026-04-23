const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema APS API",
      version: "1.0.0",
      description:
        "API para gerenciamento de gestantes e fluxo de referência/contrarreferência na Atenção Primária à Saúde (APS).",
      contact: {
        name: "Sistema APS",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira o token JWT obtido no login. Ex: Bearer <token>",
        },
      },
      schemas: {
        // ── Auth ──────────────────────────────────────────────────
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Maria Silva" },
            email: {
              type: "string",
              format: "email",
              example: "maria@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              minLength: 6,
              example: "senha123",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              default: "user",
              example: "user",
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "maria@aps.gov.br",
            },
            password: {
              type: "string",
              format: "password",
              example: "senha123",
            },
          },
        },

        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            user: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                name: { type: "string", example: "Maria Silva" },
                email: { type: "string", example: "maria@gmail.com" },
                role: { type: "string", example: "user" },
              },
            },
          },
        },

        // ── Gestante ─────────────────────────────────────────────
        GestanteInput: {
          type: "object",
          required: ["nome", "cpf", "dataNascimento"],
          properties: {
            nome: { type: "string", example: "Ana Paula Souza" },
            cpf: { type: "string", example: "123.456.789-00" },
            dataNascimento: {
              type: "string",
              format: "date",
              example: "1995-06-15",
            },
            telefone: { type: "string", example: "(83) 99999-0000" },
            endereco: {
              type: "string",
              example: "Rua das Flores, 123 - Campina Grande/PB",
            },
          },
        },
        Gestante: {},

        // ── Referência ───────────────────────────────────────────
        ReferenciaInput: {},

        // ── Contrarreferência ────────────────────────────────────
        ContrarrefInput: {},

        // ── Genéricos ────────────────────────────────────────────
        Error: {
          type: "object",
          properties: {
            error: { type: "string", example: "Mensagem de erro" },
            message: { type: "string", example: "Detalhes adicionais" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: "Auth", description: "Autenticação e registro de usuários" },
      { name: "Gestantes", description: "Cadastro e gestão de gestantes" },
      {
        name: "Referências",
        description: "Encaminhamentos para outras unidades",
      },
      {
        name: "Contrarreferências",
        description: "Retorno das gestantes encaminhadas",
      },
    ],
    paths: {
      // ═══════════════════════════════════════════════════════════
      // AUTH
      // ═══════════════════════════════════════════════════════════
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Registrar novo usuário",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            400: {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            409: {
              description: "E-mail já cadastrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Autenticar usuário",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Login realizado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            401: {
              description: "Credenciais inválidas",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },

      // ═══════════════════════════════════════════════════════════
      // GESTANTES
      // ═══════════════════════════════════════════════════════════
      "/gestantes": {},

      // ═══════════════════════════════════════════════════════════
      // REFERÊNCIAS
      // ═══════════════════════════════════════════════════════════
      "/referencias": {},

      // ═══════════════════════════════════════════════════════════
      // CONTRARREFERÊNCIAS
      // ═══════════════════════════════════════════════════════════
      "/contrarreferencias": {},
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
