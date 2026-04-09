# Jammming

Jammming é um CRUD fullstack simples para gerenciamento de álbuns musicais.

## Requisitos

- Node.js `22.12+` ou `20.19+`
- MySQL

## Como rodar

1. Importe `database/jammming.sql` no MySQL.
2. Crie `backend/.env` com base em `backend/.env.example`.
3. Crie `frontend/.env` com base em `frontend/.env.example`.
4. Instale e rode o backend:

```bash
cd backend
npm install
npm run dev
```

5. Em outro terminal, instale e rode o frontend:

```bash
cd frontend
npm install
npm run dev
```

## Variáveis de ambiente

Backend:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=jammming
```

Frontend:

```env
VITE_API_URL=http://localhost:3001/api
```
