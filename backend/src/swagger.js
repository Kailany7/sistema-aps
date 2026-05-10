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
      {
        url: "https://sistema-aps-ny0k.onrender.com",
        description: "Servidor de produção",
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
                id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
                name: { type: "string", example: "Maria Silva" },
                email: { type: "string", example: "maria@gmail.com" },
                role: { type: "string", example: "user" },
              },
            },
          },
        },

        // ── Usuário ───────────────────────────────────────────────
        UsuarioInput: {
          type: "object",
          required: ["nome", "login", "senha_hash", "perfil", "unidade_saude"],
          properties: {
            nome: { type: "string", example: "Dr. João Pereira" },
            login: { type: "string", example: "joao.pereira" },
            senha_hash: {
              type: "string",
              format: "password",
              example: "senha123",
            },
            perfil: {
              type: "string",
              enum: ["medico", "enfermeiro", "agente_saude"],
              example: "medico",
            },
            unidade_saude: {
              type: "string",
              example: "UBS Centro - Campina Grande",
            },
          },
        },

        Usuario: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            nome: { type: "string", example: "Dr. João Pereira" },
            login: { type: "string", example: "joao.pereira" },
            perfil: { type: "string", example: "medico" },
            unidade_saude: {
              type: "string",
              example: "UBS Centro - Campina Grande",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-06-01T10:00:00.000Z",
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

        Gestante: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
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
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-06-01T10:00:00.000Z",
            },
          },
        },

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
      {
        name: "Usuários",
        description: "Cadastro e listagem de profissionais de saúde",
      },
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
      // USUÁRIOS
      // ═══════════════════════════════════════════════════════════
      "/usuarios": {
        post: {
          tags: ["Usuários"],
          summary: "Cadastrar profissional de saúde",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UsuarioInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Usuário cadastrado com sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Usuario" },
                },
              },
            },
            400: {
              description: "Dados inválidos ou login já cadastrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            500: {
              description: "Erro interno do servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },

        get: {
          tags: ["Usuários"],
          summary: "Listar todos os profissionais de saúde",
          security: [],
          responses: {
            200: {
              description: "Lista de usuários (sem senha)",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Usuario" },
                  },
                },
              },
            },
            500: {
              description: "Erro interno do servidor",
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
      "/gestantes": {
        post: {
          tags: ["Gestantes"],
          summary: "Cadastrar nova gestante",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/GestanteInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Gestante cadastrada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Gestante" },
                    },
                  },
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
            401: {
              description: "Não autorizado — token ausente ou inválido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },

        get: {
          tags: ["Gestantes"],
          summary: "Listar todas as gestantes",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "page",
              in: "query",
              description: "Número da página",
              schema: { type: "integer", example: 1 },
            },
            {
              name: "limit",
              in: "query",
              description: "Quantidade de registros por página",
              schema: { type: "integer", example: 10 },
            },
            {
              name: "nome",
              in: "query",
              description: "Filtrar por nome",
              schema: { type: "string", example: "Ana" },
            },
          ],
          responses: {
            200: {
              description: "Lista de gestantes",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Gestante" },
                      },
                      total: { type: "integer", example: 42 },
                      page: { type: "integer", example: 1 },
                    },
                  },
                },
              },
            },
            401: {
              description: "Não autorizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            500: {
              description: "Erro interno do servidor",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },

      "/gestantes/{id}": {
        get: {
          tags: ["Gestantes"],
          summary: "Buscar gestante por ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID da gestante (MongoDB ObjectId)",
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          responses: {
            200: {
              description: "Gestante encontrada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Gestante" },
                    },
                  },
                },
              },
            },
            401: {
              description: "Não autorizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            404: {
              description: "Gestante não encontrada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },

        put: {
          tags: ["Gestantes"],
          summary: "Atualizar dados de uma gestante",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID da gestante (MongoDB ObjectId)",
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/GestanteInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Gestante atualizada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Gestante" },
                    },
                  },
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
            401: {
              description: "Não autorizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            404: {
              description: "Gestante não encontrada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },

        delete: {
          tags: ["Gestantes"],
          summary: "Remover gestante",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID da gestante (MongoDB ObjectId)",
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          responses: {
            200: {
              description: "Gestante removida com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                    },
                  },
                },
              },
            },
            400: {
              description: "Erro ao remover",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
            401: {
              description: "Não autorizado",
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
      // REFERÊNCIAS — rotas ainda sem implementação (placeholder)
      // ═══════════════════════════════════════════════════════════
      "/referencias": {},

      // ═══════════════════════════════════════════════════════════
      // CONTRARREFERÊNCIAS — rotas ainda sem implementação (placeholder)
      // ═══════════════════════════════════════════════════════════
      "/contrarreferencias": {},
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
