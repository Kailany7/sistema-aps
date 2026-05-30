# Sistema APS — Gestão de Alto Risco

Sistema web para gestão de gestantes de alto risco, cadastro, acompanhamento pré-natal, encaminhamentos e contrarreferências.

## Stack

- **Frontend:** React 19 + Vite + Bootstrap 5 + Axios
- **Backend:** Node.js + Express 5 + Mongoose
- **Banco:** MongoDB

---

## Requisitos

Antes de começar, instale os seguintes programas no computador:

| Programa | Versão | Download |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| MongoDB Community Server | 7+ | https://www.mongodb.com/try/download/community |
| Git | (qualquer versão recente) | https://git-scm.com |
| VS Code (recomendado) | — | https://code.visualstudio.com |

> **Para verificar se o Node.js está instalado:** abra o terminal e execute `node --version`

---

## Passo a passo

### 1. Instalar o MongoDB

1. Baixe e execute o instalador do **MongoDB Community Server**
2. Durante a instalação, marque a opção **"Install MongoDB as a Service"**
3. Conclua a instalação
4. Verifique se o serviço está rodando:
   - Windows: abra `Services.msc` e procure por `MongoDB Server` — o status deve estar **Running**
   - Ou execute no terminal: `Get-Service MongoDB` (PowerShell)

### 2. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd sistema-aps
```

### 3. Configurar variáveis de ambiente

**Backend:**

```bash
cd backend
cp .env.example .env
```

O arquivo `.env` criado usa os valores padrão locais. Edite se necessário (ex.: alterar porta do MongoDB).

**Frontend:**

```bash
cd frontend
cp .env.example .env
```

O valor padrão já aponta para `http://localhost:3000/api` — só precisa de alteração se o backend rodar em outra porta.

### 4. Instalar dependências

Abra **dois terminais** (um para o backend, outro para o frontend).

**Terminal 1 — Backend:**

```bash
cd backend
npm install
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm install
```

### 5. Iniciar o MongoDB

O MongoDB precisa estar rodando como serviço do Windows.

Para verificar:
```powershell
Get-Service MongoDB
```

Se não estiver rodando:
```powershell
Start-Service MongoDB
```

### 6. Iniciar o Backend

No terminal 1:

```bash
cd backend
npm run dev
```

A saída esperada:

```
Servidor rodando em http://localhost:3000
Swagger UI:      http://localhost:3000/api-docs
MongoDB conectado com sucesso
```

> O servidor reinicia automaticamente quando você altera arquivos (nodemon).

### 7. Popular o banco com dados iniciais

Com o MongoDB rodando, execute em outro terminal:

```bash
cd backend
node initial.js
```

Isso cria no banco:
- 4 unidades de saúde (USF Alto Branco, USF São José, etc.)
- 3 níveis de risco (Baixo, Intermediário, Alto)
- 6 gestantes fictícias (2 de cada nível de risco)

> Execute `node initial.js` sempre que quiser resetar o banco para o estado inicial.

### 8. Iniciar o Frontend

No terminal 2:

```bash
cd frontend
npm run dev
```

A saída esperada:

```
VITE v8.0.14  ready in 200ms
➜  Local:   http://localhost:5173
```

### 9. Acessar o sistema

| URL | Descrição |
|---|---|
| http://localhost:5173 | Frontend (sistema) |
| http://localhost:3000/api-docs | Documentação Swagger da API |
| http://localhost:3000/api/gestantes | API — listar gestantes |
| http://localhost:3000/api/unidades | API — listar unidades |
| http://localhost:3000/api/riscos | API — listar riscos |

### 10. Login

O login por enquanto apenas redireciona para o Dashboard. A autenticação JWT está desabilitada temporariamente para facilitar os testes. Clique em **"Entrar"** sem preencher os campos.

---

## Estrutura de pastas

```
sistema-aps/
├── backend/
│   ├── src/
│   │   ├── config/      # Conexão MongoDB, env
│   │   ├── controllers/ # Controladores das rotas
│   │   ├── models/      # Schemas do Mongoose
│   │   ├── routes/      # Definição de rotas
│   │   ├── services/    # Lógica de negócio
│   │   ├── app.js       # Configuração do Express
│   │   └── index.js     # Entry point
│   ├── initial.js       # Script para popular o banco
│   ├── .env.example     # Exemplo de variáveis de ambiente
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── contexts/    # ToastContext (notificações)
│   │   ├── hooks/       # Custom hooks (useApi)
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── services/    # Chamadas à API (axios)
│   │   ├── App.jsx      # Rotas
│   │   └── main.jsx     # Entry point
│   ├── .env.example
│   └── package.json
└── .gitignore
```

---

## Comandos úteis

### Backend

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor com nodemon (desenvolvimento) |
| `npm start` | Inicia o servidor sem nodemon |
| `node initial.js` | Popula o banco com dados iniciais |

### Frontend

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite |
| `npm run build` | Gera a build de produção |
| `npm run lint` | Verifica erros no código |

### API endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/gestantes` | Lista todas as gestantes |
| POST | `/api/gestantes` | Cadastra nova gestante |
| GET | `/api/gestantes/:id` | Detalhes de uma gestante |
| PUT | `/api/gestantes/:id` | Atualiza dados da gestante |
| DELETE | `/api/gestantes/:id` | Remove gestante |
| GET | `/api/unidades` | Lista unidades de saúde |
| GET | `/api/riscos` | Lista níveis de risco |
| GET | `/api/referencias` | Lista encaminhamentos |
| POST | `/api/referencias` | Cria novo encaminhamento |
| GET | `/api/referencias/:id` | Detalhes do encaminhamento |

---

## Troubleshooting

**"MongoDB conectado com sucesso" não aparece no terminal**
→ O serviço MongoDB não está rodando. Execute `Start-Service MongoDB` no PowerShell como Admin.

**"Porta 3000 já está em uso"**
→ Outro processo está usando a porta. Feche-o ou altere a variável `PORT` no `.env` do backend.

**"Module not found" ao executar npm run dev**
→ Você esqueceu de rodar `npm install` na pasta correspondente.

**CORS erro no frontend**
→ O backend não está rodando. Verifique se o terminal do backend está ativo.
