<h1 align="center">📊 Logs UP - Teste</h1>

<p align="center">
Uma aplicação completa para gerenciamento de usuários e produtos,
desenvolvida com React (Vite) no frontend e Node.js + Express.js no backend,
utilizando Prisma e PostgreSQL.
</p>

---

## 🛠️ Como Instalar e Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-repositorio/logs-up-teste.git
cd logs-up-teste
```

### 2. Instale as dependências

### Instalar dependências do backend

```bash
cd backend
npm install
```

### Instalar dependências do frontend

```bash
cd ../frontend
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo **_.env_** dentro da pasta backend (raiz do backend) com o seguinte conteúdo:

```env
DATABASE_URL='postgresql://neondb_owner:npg_wCmUKty5JR4P@ep-patient-lab-aef77mgi-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

JWT_SECRET='sua_chave_gerada'
```

> ⚠️ Observação: o banco de dados já está configurado na nuvem apenas
> para fins de **experiência completa**.\
> Gere sua própria chave JWT com o comando:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Rode as migrações do Prisma

```bash
cd backend
npx prisma migrate dev
```

### 5. Inicie o backend e o frontend

Tanto Frontend quanto Backend usam:

```bash
npm run dev //
# ou
yarn dev
```

---

## 🔑 Conta de Teste (Admin)

Use essa conta para acessar como administrador:

- **E-mail:** test@gmail.com
- **Senha:** logsup123

---

## 🚀 Tecnologias Utilizadas

## Frontend

- **React 19 (Vite)**
- **TypeScript**
- **TailwindCSS**
- **Shadcn/ui**
- **lucide-react**
- **react-hook-form**
- **Zod** (validação de dados)
- **Tanstack React Query** (requisições e cache)

## Backend

- **Node.js + Expres.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT**
- **bcryptjs**

---

## 📦 Funcionalidades

- Autenticação com JWT (login, registro e logout)
- CRUD de Usuários
- CRUD de Produtos
- Sistema de permissões: `ADMIN` \| `ANALISTA` \| `SUPERVISOR`
- Gerenciamento de sessões seguras com cookies
- Validação de formulários com React Hook Form + Zod
- Revalidação automática com React Query

---

## 🧠 Backend

### 📌 Models Principais

#### 👤 User

```json
{
  "id": "uuid",
  "name": "Leandro",
  "email": "user@example.com",
  "role": "ADMIN",
  "password": "hashed_password",
  "createdAt": "2025-09-22T12:00:00.000Z",
  "updatedAt": "2025-09-22T12:00:00.000Z"
}
```

#### 📦 Product

```json
{
  "id": "uuid",
  "name": "Notebook Dell",
  "description": "Notebook para uso corporativo",
  "price": 3500.5,
  "stock": 15,
  "createdAt": "2025-09-22T12:00:00.000Z",
  "updatedAt": "2025-09-22T12:00:00.000Z",
  "userId": "uuid"
}
```

#### 🎭 Role (Enum)

```json
"ADMIN" | "ANALISTA" | "SUPERVISOR"
```

---

## 🔐 Autenticação JWT

- Login gera um token JWT e armazena em cookie `httpOnly` seguro.\
- Middleware valida o token e protege rotas privadas.\
- Apenas usuários `ADMIN` conseguem editar outros usuários.

---

## ⚙️ Rotas Backend (API)

### Produtos

- `GET /products` → Listar todos os produtos
- `GET /products/:id` → Obter produto específico
- `POST /products` → Criar produto (AUTH)
- `PUT /products/:id` → Atualizar produto (SUPERVISOR)
- `DELETE /products/:id` → Deletar produto (SUPERVISOR)

### Usuários

- `POST /users` → Criar usuário
- `POST /auth/login` → Login
- `POST /auth/logout` → Logout
- `GET /users/me` → Retornar usuário autenticado
- `GET /users` → Listar usuários (AUTH)
- `GET /users/roles` → Listar roles disponíveis (AUTH)
- `PATCH /users/:id/role` → Atualizar role do usuário (ADMIN)

---

## 🎨 Frontend

O frontend foi construído para ser **rápido, responsivo e intuitivo**, consumindo a API do backend e utilizando **React Query** para cache de dados.

### 📄 Páginas Principais

- `/` → Login
- `/register` → Cadastro de usuário
- `/list-products` → Listagem de produtos
- `/new-product/:id?` → Criar/editar produto
- `/users` → Gerenciamento de usuários (ADMIN)

### ⚡ Lógica Frontend

- `services/*.ts` → comunicação com API (axios)
- `hooks/*.ts` → abstrações com React Query (ex.: `useProducts`, `useUsers`)
- `context/*` → gerenciamento global de autenticação
- Validações com **Zod** + **react-hook-form**
- Estilização com **TailwindCSS** + **Shadcn/ui**

---

## ✅ Checklist de Funcionalidades

### Backend

- [x] Registro e login com JWT\
- [x] CRUD de usuários (com permissões)\
- [x] CRUD de produtos\
- [x] Middleware de autenticação\
- [x] Banco PostgreSQL configurado na nuvem

### Frontend

- [x] Login e logout\
- [x] Listagem de produtos\
- [x] Criação/edição/remoção de produtos\
- [x] Listagem e gerenciamento de usuários (ADMIN)\
- [x] Integração com React Query\
- [x] Validação de formulários

---

## 📸 Screenshots

---
