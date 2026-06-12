# Sistema APS — Gestão de Alto Risco

## Descrição
Sistema web para gestão de gestantes de alto risco na Atenção Primária à Saúde (APS).
Permite cadastro de gestantes, acompanhamento pré-natal, fluxo de referência (encaminhamento)
e contrarreferência (retorno à UBS de origem).

## Tecnologias
- **Frontend:** React 19 + Vite 8 + React Router 7 + Bootstrap 5 + Axios
- **Backend:** Node.js + Express 5 + Mongoose 8 + JWT (bcryptjs)
- **Banco:** MongoDB
- **Documentação:** Swagger (swagger-jsdoc + swagger-ui-express)

## Estrutura
```
sistema-aps/
├── backend/
│   ├── src/
│   │   ├── config/           # db.js, env.js
│   │   ├── controllers/      # gestante, referencia, contrarref, auth, user, unidade, risco
│   │   ├── models/           # Gestante, Referencia, Contrarref, User, UnidadeSaude, Risco
│   │   ├── routes/           # REST routes (CRUD)
│   │   ├── services/         # Lógica de negócio
│   │   ├── middlewares/      # auth.middleware (JWT), upload.middleware
│   │   ├── app.js            # Config Express + rotas
│   │   └── index.js          # Entry point
│   └── initial.js            # Seed do banco
├── frontend/
│   ├── src/
│   │   ├── pages/            # Login, Dashboard, CadastroGestante, ListaGestantes,
│   │   │                     # AcompanhamentoGestante, ListaEncaminhamentos,
│   │   │                     # NovoEncaminhamento, DetalheEncaminhamento, MainLayout
│   │   ├── services/         # api.js (axios), gestanteService, etc.
│   │   ├── hooks/            # useApi, useForm
│   │   ├── contexts/         # ToastContext
│   │   ├── components/       # AsyncContent, Dropzone, CardSection, PageHeader
│   │   ├── utils/            # errors.js
│   │   ├── App.jsx           # Rotas
│   │   └── main.jsx          # Entry point
│   └── package.json
```

## Arquitetura
- **Backend:** MVC simplificado — routes → controllers → services → models (Mongoose)
- **Frontend:** SPA com React Router, hooks customizados (useApi, useForm)
- **Autenticação:** JWT (7 dias), middleware existe mas não está ativo nas rotas
- **Modelagem:** MongoDB — consultas embutidas em gestante; referências entre coleções (ObjectId)

## Modelos
- **Gestante:** Dados pessoais + gestacionais + clínicos + consultas embutidas + docs + unidade
- **Referencia:** Especialidade, motivo, status, profissional, UBS origem → vinculado à gestante
- **Contrarref:** Conduta, plano, status → vinculado à referência
- **User:** Login, senha (bcrypt), perfil (médico/enfermeiro/agente_saude), unidade
- **UnidadeSaude / Risco:** Tabelas auxiliares

## Rotas da API
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/auth/login | Login |
| POST | /api/auth/register | Registrar usuário |
| GET/POST | /api/gestantes | Listar/Criar gestantes |
| GET/PUT/DELETE | /api/gestantes/:id | CRUD gestante |
| GET/POST | /api/referencias | Listar/Criar encaminhamentos |
| GET/PUT/DELETE | /api/referencias/:id | CRUD encaminhamento |
| GET | /api/unidades | Listar unidades |
| GET | /api/riscos | Listar riscos |
| GET | /api/usuarios | Listar usuários |

## Melhorias Identificadas
1. Ativar middleware JWT nas rotas protegidas
2. Implementar controller e rotas de contrarreferência (estão vazios)
3. Integrar upload de arquivos (Dropzone coleta mas não envia)
4. Dashboard dinâmico com dados reais
5. Paginação e filtros nas listagens
6. Validação mais robusta (Zod/Yup nos formulários)
7. Migrar para TypeScript (já há indício com .ts parcial)
8. Adicionar testes (unitários, integração)
9. Completar schemas e paths do Swagger
10. Tratamento de erros global via interceptador Axios
