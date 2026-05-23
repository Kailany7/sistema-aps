const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema APS API",
      version: "1.0.0",
      description:
        "API para gerenciamento de gestantes e fluxo de referência/contrarreferência na Atenção Primária à Saúde (APS).",
      contact: { name: "Sistema APS" },
    },
    servers: [
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
          required: ["nome", "login", "senha", "perfil"],
          properties: {
            nome: { type: "string", example: "Maria Silva" },
            login: { type: "string", example: "maria@aps.gov.br" },
            senha: { type: "string", format: "password", minLength: 6, example: "senha123" },
            perfil: { type: "string", enum: ["medico", "enfermeiro", "agente_saude"], example: "enfermeiro" },
            unidade_saude: { type: "string", example: "USF Alto Branco" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["login", "senha"],
          properties: {
            login: { type: "string", format: "email", example: "maria@aps.gov.br" },
            senha: { type: "string", format: "password", example: "senha123" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            user: {
              type: "object",
              properties: {
                id: { type: "string", example: "6a0f507ab80096480746ebc2" },
                nome: { type: "string", example: "Maria Silva" },
                login: { type: "string", example: "maria@aps.gov.br" },
                perfil: { type: "string", example: "enfermeiro" },
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
          required: [
            "nome",
            "cpf",
            "dataNascimento",
            "telefone",
            "semanasGestacao",
            "unidadeSaude",
          ],
          properties: {
            nome: { type: "string", example: "Ana Paula Souza" },
            cpf: {
              type: "string",
              example: "12345678900",
              description: "Somente números, 11 dígitos",
            },
            dataNascimento: {
              type: "string",
              format: "date",
              example: "1995-06-15",
            },
            telefone: { type: "string", example: "(83) 99999-0000" },
            telefoneSecundario: { type: "string", example: "(83) 88888-0000" },
            endereco: {
              type: "string",
              example: "Rua das Flores, 123 - Campina Grande/PB",
            },
            numeroCartaoSus: { type: "string", example: "123456789012345" },
            semanasGestacao: { type: "number", example: 20 },
            dataUltimaMenstruacao: {
              type: "string",
              format: "date",
              example: "2024-01-10",
            },
            dataProvavelParto: {
              type: "string",
              format: "date",
              example: "2024-10-17",
            },
            numGestacoes: { type: "number", example: 1 },
            numPartos: { type: "number", example: 0 },
            numAbortos: { type: "number", example: 0 },
            resumoClinico: {
              type: "string",
              example: "Paciente sem comorbidades",
            },
            historicoDoencas: { type: "string", example: "Hipertensão leve" },
            estratificacaoRisco: {
              type: "string",
              enum: ["alto", "medio", "baixo", "habitual"],
              example: "habitual",
            },
            unidadeSaude: {
              type: "string",
              example: "UBS Centro - Campina Grande",
            },
            profissionalResponsavel: {
              type: "string",
              example: "Dr. João Pereira",
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

        // ── Encaminhamento ───────────────────────────────────────
        EncaminhamentoInput: {
          type: "object",
          required: ["especialidade", "gestante_id"],
          properties: {
            gestante_id: {
              type: "string",
              example: "664f1a2b3c4d5e6f7a8b9c0d",
            },
            especialidade: { type: "string", example: "Cardiologia" },
            motivo: {
              type: "string",
              example: "Hipertensão gestacional severa",
            },
            estratificacao_risco: {
              type: "string",
              example: "Alto risco — mudança de classificação",
            },
            cid10: { type: "string", example: "O14.1" },
            profissional_encaminhador: {
              type: "object",
              properties: {
                nome: { type: "string", example: "Dr. Carlos Lima" },
                crm: { type: "string", example: "CRM-PB 12345" },
              },
            },
            ubs_origem: {
              type: "object",
              properties: {
                nome: { type: "string", example: "UBS Centro" },
                acs_responsavel: {
                  type: "string",
                  example: "Maria das Graças",
                },
              },
            },
            arquivos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  nome: { type: "string", example: "cartao_gestante.pdf" },
                  url: {
                    type: "string",
                    example: "https://storage.exemplo.com/arquivo.pdf",
                  },
                },
              },
            },
          },
        },
        Encaminhamento: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            especialidade: { type: "string", example: "Cardiologia" },
            motivo: {
              type: "string",
              example: "Hipertensão gestacional severa",
            },
            estratificacao_risco: { type: "string", example: "Alto risco" },
            cid10: { type: "string", example: "O14.1" },
            status: {
              type: "string",
              enum: ["pendente", "agendado", "realizado", "cancelado"],
              example: "pendente",
            },
            data_solicitacao: {
              type: "string",
              format: "date-time",
              example: "2024-06-01T10:00:00.000Z",
            },
            data_consulta: {
              type: "string",
              format: "date-time",
              example: "2024-06-15T09:00:00.000Z",
            },
            gestante_id: {
              type: "string",
              example: "664f1a2b3c4d5e6f7a8b9c0d",
            },
            usuario_id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0e" },
          },
        },

        // ── Contra-referência ────────────────────────────────────
        ContrarrefInput: {
          type: "object",
          required: ["referencia_id"],
          properties: {
            referencia_id: {
              type: "string",
              example: "664f1a2b3c4d5e6f7a8b9c0d",
            },
            conduta_tomada: {
              type: "string",
              example: "Medicação ajustada, repouso prescrito",
            },
            plano_acompanhamento: {
              type: "string",
              example: "Retorno quinzenal à UBS",
            },
            relatorio_alta: {
              type: "string",
              example: "Paciente estabilizada, sem risco imediato",
            },
            cid10: { type: "string", example: "O14.1" },
            contato: {
              type: "object",
              properties: {
                nome: { type: "string", example: "Dra. Ana Souza" },
                telefone: { type: "string", example: "(83) 99999-1111" },
              },
            },
            ubs_origem: {
              type: "object",
              properties: {
                nome: { type: "string", example: "UBS Centro" },
                acs_responsavel: {
                  type: "string",
                  example: "Maria das Graças",
                },
              },
            },
            profissional_responsavel: {
              type: "object",
              properties: {
                nome: { type: "string", example: "Dr. Roberto Alves" },
                crm: { type: "string", example: "CRM-PB 54321" },
              },
            },
            status_gestante: {
              type: "string",
              enum: ["estavel", "atencao", "critico"],
              example: "estavel",
            },
          },
        },
        Contrarref: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            conduta_tomada: { type: "string", example: "Medicação ajustada" },
            plano_acompanhamento: {
              type: "string",
              example: "Retorno quinzenal",
            },
            status_gestante: {
              type: "string",
              enum: ["estavel", "atencao", "critico"],
              example: "estavel",
            },
            data_retorno: {
              type: "string",
              format: "date-time",
              example: "2024-06-20T10:00:00.000Z",
            },
            referencia_id: {
              type: "string",
              example: "664f1a2b3c4d5e6f7a8b9c0d",
            },
            usuario_id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0e" },
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
        name: "Encaminhamentos",
        description: "Encaminhamento da UBS para especialista",
      },
      {
        name: "Contra-referências",
        description: "Retorno da atenção especializada para a UBS",
      },
      {
        name: "Relatórios",
        description: "Dados agregados para dashboard e exportação",
      },
    ],
    paths: {
      // ═══════════════════════════════════════════════════════════
      // AUTH
      // ═══════════════════════════════════════════════════════════
      "/api/auth/register": {
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
      "/api/auth/login": {
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

      // ── USUÁRIOS ──────────────────────────────────────────────
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
              description: "Erro interno",
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
              description: "Erro interno",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },

      // ── GESTANTES ─────────────────────────────────────────────
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
              description: "Gestante cadastrada",
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
              schema: { type: "integer", example: 1 },
            },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", example: 10 },
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
              description: "Gestante atualizada",
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
              description: "Não encontrada",
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
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          responses: {
            200: {
              description: "Gestante removida",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { success: { type: "boolean", example: true } },
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
          },
        },
      },

      // ── ENCAMINHAMENTOS ───────────────────────────────────────
      "/encaminhamentos": {
        post: {
          tags: ["Encaminhamentos"],
          summary: "Criar novo encaminhamento",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EncaminhamentoInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Encaminhamento criado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Encaminhamento" },
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
          },
        },
        get: {
          tags: ["Encaminhamentos"],
          summary: "Listar encaminhamentos",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "status",
              in: "query",
              schema: {
                type: "string",
                enum: ["pendente", "agendado", "realizado", "cancelado"],
              },
            },
            { name: "gestante_id", in: "query", schema: { type: "string" } },
            {
              name: "dataInicio",
              in: "query",
              description: "Formato YYYY-MM-DD",
              schema: { type: "string", format: "date" },
            },
            {
              name: "dataFim",
              in: "query",
              description: "Formato YYYY-MM-DD",
              schema: { type: "string", format: "date" },
            },
          ],
          responses: {
            200: {
              description: "Lista de encaminhamentos",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      total: { type: "integer", example: 10 },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Encaminhamento" },
                      },
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
          },
        },
      },
      "/encaminhamentos/{id}": {
        get: {
          tags: ["Encaminhamentos"],
          summary: "Buscar encaminhamento por ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          responses: {
            200: {
              description: "Encaminhamento encontrado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Encaminhamento" },
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
              description: "Não encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Encaminhamentos"],
          summary: "Atualizar encaminhamento",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EncaminhamentoInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Encaminhamento atualizado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Encaminhamento" },
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
              description: "Não encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Encaminhamentos"],
          summary: "Remover encaminhamento",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          responses: {
            200: {
              description: "Encaminhamento removido",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { success: { type: "boolean", example: true } },
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
          },
        },
      },

      // ── CONTRA-REFERÊNCIAS ────────────────────────────────────
      "/contrarreferencias": {
        post: {
          tags: ["Contra-referências"],
          summary: "Registrar contra-referência (retorno do especialista)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ContrarrefInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Contra-referência registrada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Contrarref" },
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
          },
        },
        get: {
          tags: ["Contra-referências"],
          summary: "Listar contra-referências",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "status_gestante",
              in: "query",
              schema: {
                type: "string",
                enum: ["estavel", "atencao", "critico"],
              },
            },
            { name: "referencia_id", in: "query", schema: { type: "string" } },
            {
              name: "dataInicio",
              in: "query",
              description: "Formato YYYY-MM-DD",
              schema: { type: "string", format: "date" },
            },
            {
              name: "dataFim",
              in: "query",
              description: "Formato YYYY-MM-DD",
              schema: { type: "string", format: "date" },
            },
          ],
          responses: {
            200: {
              description: "Lista de contra-referências",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      total: { type: "integer", example: 5 },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Contrarref" },
                      },
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
          },
        },
      },
      "/contrarreferencias/{id}": {
        get: {
          tags: ["Contra-referências"],
          summary: "Buscar contra-referência por ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          responses: {
            200: {
              description: "Contra-referência encontrada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Contrarref" },
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
              description: "Não encontrada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Contra-referências"],
          summary: "Atualizar contra-referência",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ContrarrefInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Contra-referência atualizada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Contrarref" },
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
              description: "Não encontrada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Contra-referências"],
          summary: "Remover contra-referência",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            },
          ],
          responses: {
            200: {
              description: "Contra-referência removida",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { success: { type: "boolean", example: true } },
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
          },
        },
      },

      // ── RELATÓRIOS ────────────────────────────────────────────
      "/relatorios/gestantes": {
        get: {
          tags: ["Relatórios"],
          summary: "Relatório de gestantes por risco e por UBS",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "unidadeSaude",
              in: "query",
              description: "Filtrar por unidade de saúde",
              schema: { type: "string", example: "UBS Centro" },
            },
            {
              name: "dataInicio",
              in: "query",
              description: "Data início (YYYY-MM-DD)",
              schema: { type: "string", format: "date", example: "2024-01-01" },
            },
            {
              name: "dataFim",
              in: "query",
              description: "Data fim (YYYY-MM-DD)",
              schema: { type: "string", format: "date", example: "2024-12-31" },
            },
          ],
          responses: {
            200: {
              description: "Relatório gerado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      totalGeral: { type: "integer", example: 127 },
                      porRisco: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              enum: ["alto", "medio", "baixo", "habitual"],
                              example: "alto",
                            },
                            total: { type: "integer", example: 43 },
                          },
                        },
                      },
                      porUbs: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: { type: "string", example: "UBS Centro" },
                            total: { type: "integer", example: 30 },
                            altoRisco: { type: "integer", example: 10 },
                            medioRisco: { type: "integer", example: 8 },
                            baixoRisco: { type: "integer", example: 7 },
                            habitual: { type: "integer", example: 5 },
                          },
                        },
                      },
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
              description: "Erro interno",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },

      "/relatorios/encaminhamentos": {
        get: {
          tags: ["Relatórios"],
          summary: "Relatório de encaminhamentos por período",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "status",
              in: "query",
              description: "Filtrar por status",
              schema: {
                type: "string",
                enum: ["pendente", "agendado", "realizado", "cancelado"],
              },
            },
            {
              name: "especialidade",
              in: "query",
              description: "Filtrar por especialidade",
              schema: { type: "string", example: "Cardiologia" },
            },
            {
              name: "dataInicio",
              in: "query",
              description: "Data início (YYYY-MM-DD)",
              schema: { type: "string", format: "date", example: "2024-01-01" },
            },
            {
              name: "dataFim",
              in: "query",
              description: "Data fim (YYYY-MM-DD)",
              schema: { type: "string", format: "date", example: "2024-12-31" },
            },
          ],
          responses: {
            200: {
              description: "Relatório gerado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      totalGeral: { type: "integer", example: 58 },
                      porStatus: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              enum: [
                                "pendente",
                                "agendado",
                                "realizado",
                                "cancelado",
                              ],
                              example: "pendente",
                            },
                            total: { type: "integer", example: 20 },
                          },
                        },
                      },
                      porEspecialidade: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: { type: "string", example: "Cardiologia" },
                            total: { type: "integer", example: 15 },
                            pendentes: { type: "integer", example: 5 },
                            realizados: { type: "integer", example: 10 },
                          },
                        },
                      },
                      porPeriodo: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "object",
                              properties: {
                                ano: { type: "integer", example: 2024 },
                                mes: { type: "integer", example: 6 },
                              },
                            },
                            total: { type: "integer", example: 12 },
                          },
                        },
                      },
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
              description: "Erro interno",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
