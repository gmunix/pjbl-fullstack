# Jammming

Jammming é um CRUD fullstack simples de álbuns, com React no frontend, Node.js com Express no backend e MySQL como banco de dados.

## Tecnologias

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, mysql2, express-validator, CORS
- Banco de dados: MySQL

## Funcionalidades

- Listagem de álbuns com paginação
- Busca de álbuns por título ou artista
- Visualização de detalhes do álbum
- Cadastro de novos álbuns
- Edição de álbuns existentes
- Exclusão de álbuns
- Validação no backend e mensagens de retorno no frontend
- Rodapé com o nome do aluno visível no sistema

## Estrutura do projeto

```text
pjbl/
  backend/
  database/
  frontend/
```

## Como executar

### 1. Importe o banco de dados

Importe o arquivo `database/jammming.sql` no MySQL. O script cria o banco, cria a tabela `albums` e insere dados iniciais.

### 2. Configure o backend

Dentro de `backend/`, crie um arquivo `.env` com base no `.env.example`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=jammming
```

Instale as dependências e inicie a API:

```bash
cd backend
npm install
npm run dev
```

### 3. Configure o frontend

Dentro de `frontend/`, crie um arquivo `.env` com base no `.env.example`:

```env
VITE_API_URL=http://localhost:3001/api
```

Instale as dependências e inicie o frontend:

```bash
cd frontend
npm install
npm run dev
```

O frontend roda na porta padrão do Vite e consome a API do backend.

## Rotas da API

- `GET /api/albums`
- `GET /api/albums/:id`
- `POST /api/albums`
- `PUT /api/albums/:id`
- `DELETE /api/albums/:id`

## Validação

Os álbuns exigem os seguintes campos:

- `title`
- `artist`
- `genre`
- `releaseYear`
- `tracksCount`

Campos opcionais:

- `label`
- `coverUrl`

## Observações

- O nome da aplicação é `Jammming`.
- O rodapé mostra `Desenvolvido por Gustavo Muniz`.
- O arquivo SQL exigido pelo trabalho está em `database/jammming.sql`.
