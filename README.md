# API REST com Node.js, Express e MySQL (MVC)

**Aluno:** Vitor Hugo Pedroso de Almeida
**Turma:** 3 NDN
**Disciplina:** Programação Web III (PW3)
**Atividade:** Atividade Prática 02 – Refatoração para Arquitetura MVC

API REST em Node.js + Express com MySQL, usando SQL direto via `mysql2` (sem ORM) e queries parametrizadas (`?`) contra SQL Injection. Nesta versão, o código da atividade anterior foi separado em camadas (MVC).

## Arquitetura

```text
src/
├── config/
│   └── db.js                  # pool de conexão com o MySQL e variáveis de ambiente
├── models/
│   └── usuarioModel.js        # consultas SQL (INSERT, SELECT, UPDATE, DELETE)
├── controllers/
│   └── usuarioController.js   # validação, chamada ao Model e resposta HTTP
├── routes/
│   └── usuarioRoutes.js       # endpoints (express.Router)
├── app.js                     # middlewares e registro das rotas
└── server.js                  # inicialização do servidor
```

- **Config:** cria o pool de conexões e carrega o `.env` com o `dotenv`.
- **Model:** única camada com SQL; executa as queries parametrizadas e devolve dados ao Controller.
- **Controller:** recebe `req`, valida os dados de entrada, aciona o Model e responde com o status HTTP adequado em `res`.
- **Routes:** associa cada verbo HTTP e caminho a uma função do Controller.
- **View:** por ser uma API, as respostas em JSON fazem o papel da View.
- **app.js / server.js:** nenhum SQL; apenas configuração e inicialização.

## Pré-requisitos

- Node.js 18+
- MySQL 8+ em execução

## Instalação e execução

1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/VHPA/vitor-almeida-API-node-mvc.git
   cd vitor-almeida-API-node-mvc
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o banco e a tabela:
   ```bash
   mysql -u SEU_USUARIO -p < schema.sql
   ```
4. Crie o `.env` a partir do modelo e preencha com suas credenciais:
   ```bash
   cp .env.example .env
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor sobe em `http://localhost:3000`.

## Rotas

| Método | Rota            | Descrição                         | Respostas        |
|--------|-----------------|-----------------------------------|------------------|
| POST   | `/usuarios`     | Cria usuário (`nome`, `email`)    | 201, 400, 409, 500 |
| GET    | `/usuarios`     | Lista todos os usuários           | 200, 500         |
| PUT    | `/usuarios/:id` | Atualiza `nome` e `email`         | 200, 400, 404, 409, 500 |
| DELETE | `/usuarios/:id` | Remove o usuário                  | 200, 404, 500    |

## Exemplos (curl)

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria","email":"maria@email.com"}'

curl http://localhost:3000/usuarios

curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva","email":"maria.silva@email.com"}'

curl -X DELETE http://localhost:3000/usuarios/1
```
