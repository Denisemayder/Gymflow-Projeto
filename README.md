# GYMFLOW

## Sistema de Gerenciamento de Treinos de Academia

GYMFLOW é uma API REST desenvolvida em Node.js para gerenciamento de treinos de academia. O sistema permite o cadastro de usuários, alunos, treinadores, exercícios, treinos e o acompanhamento da evolução dos alunos.

O projeto foi desenvolvido como avaliação das disciplinas de Desenvolvimento Web, Banco de Dados e Infraestrutura de Sistemas Web.

---

# Tecnologias Utilizadas

* Node.js 24
* Express
* PostgreSQL 17
* Sequelize ORM
* Knex
* Redis
* Nginx
* Docker e Docker Compose
* JWT
* Bcrypt
* Swagger

---

# Arquitetura

```text
Host
   │
   ▼
Nginx (Proxy Reverso)
   │
   ▼
Node.js / Express
   │
   ├────────► Redis
   │
   ▼
PostgreSQL
```

A aplicação segue o modelo de proxy reverso, onde apenas o Nginx possui acesso externo.

O servidor Node.js permanece acessível apenas pela rede interna do Docker.

O banco PostgreSQL não possui portas expostas para o host.

---

# Banco de Dados

O projeto utiliza PostgreSQL por oferecer:

* banco relacional robusto;
* conformidade ACID;
* suporte a relacionamentos complexos;
* excelente integração com Sequelize.

## Entidades

* Usuários
* Alunos
* Personais
* Exercícios
* Treinos
* Histórico
* Progresso

## Relação N:N

O sistema possui relacionamento muitos-para-muitos entre:

Treinos ↔ Exercícios

através da tabela pivô:

```text
TreinoExercicios
```

---

## Modelagem

Os arquivos de modelagem encontram-se na pasta:

```text
modelagem/
```

Contendo:

* DER
* Modelo Lógico
* Dicionário de Dados

---

# Containers Utilizados

| Container           | Imagem             | Finalidade               |
| ------------------- | ------------------ | ------------------------ |
| gymflow-nginx-proxy | nginx:alpine       | Proxy reverso            |
| gymflow-app         | node:24-alpine     | Servidor Node.js         |
| gymflow-cli         | node:24-alpine     | Execução de comandos CLI |
| gymflow-db          | postgres:17-alpine | Banco PostgreSQL         |
| gymflow-cache       | redis:7-alpine     | Cache Redis              |

---

# Infraestrutura

## Dockerfile

O projeto utiliza Dockerfile otimizado através de:

* Multi-stage Build
* imagens Alpine
* cache de camadas
* arquivo `.dockerignore`

reduzindo o tamanho da imagem final e acelerando o processo de build.

---

## Redes Docker

A comunicação entre os containers ocorre através de redes Docker customizadas.

```text
proxy-network

Nginx
   │
App
```

```text
db-network

App
│
├── PostgreSQL
└── Redis
```

Os containers comunicam-se utilizando o nome do serviço (DNS interno do Docker).

O banco de dados permanece isolado da rede externa.

---

## Persistência

A persistência dos dados é realizada através de Named Volumes do Docker.

Mesmo após reiniciar ou remover os containers, os dados permanecem armazenados enquanto o volume existir.

---

## Segurança

O projeto utiliza:

* variáveis de ambiente (.env)
* autenticação JWT
* senhas criptografadas com bcrypt
* banco sem portas públicas
* servidor Node acessível apenas pelo Nginx

---

# Bibliotecas Utilizadas

* express
* sequelize
* knex
* pg
* pg-hstore
* bcrypt
* jsonwebtoken
* dotenv
* swagger-jsdoc
* swagger-ui-express

---

# Pré-requisitos

* Git
* Docker Desktop
* Docker Compose
* WSL2 (Windows)

---

# Como Executar

## 1. Clonar o repositório

```bash
git clone https://github.com/Denisemayder/Gymflow-Projeto.git
```

---

## 2. Entrar na pasta

```bash
cd Gymflow-Projeto
```

---

## 3. Instalar dependências

```bash
npm install
```

---

## 4. Criar arquivo .env

```bash
cp .env.example .env
```

Preencha os valores necessários.

Nunca envie o arquivo `.env` para o GitHub.

---

## 5. Subir toda a infraestrutura

```bash
docker compose up --build
```

Na primeira execução o PostgreSQL criará automaticamente o banco através do script presente em:

```text
scripts/setup.sql
```

---

# Executando as Migrations

Após subir a infraestrutura:

```bash
docker compose run --rm cli node command.js migrate
```

O comando cria um container temporário apenas para executar as migrations, mantendo o banco inacessível externamente.

---

# Documentação Swagger

Após iniciar o projeto:

```text
http://localhost/api-docs
```

Toda a documentação das APIs encontra-se disponível no Swagger.

---

# Autenticação JWT

## Criar um usuário

```http
POST /usuarios
```

Exemplo:

```json
{
  "nome": "Admin GymFlow",
  "email": "admin@gymflow.com",
  "senha": "senha123",
  "tipo": "admin"
}
```

Tipos disponíveis:

* admin
* trainer
* aluno

---

## Login

```http
POST /login
```

Resposta:

```json
{
   "token": "..."
}
```

---

## Utilizando o Token

Enviar em todas as rotas protegidas:

```text
Authorization: Bearer <token>
```

---

## Permissões

Admin

* acesso total

Trainer

* gerencia alunos
* gerencia treinos

Aluno

* consulta seus treinos
* consulta histórico
* consulta progresso

---

# Rotas

O projeto possui CRUD completo para todas as entidades.

* Usuários
* Alunos
* Personais
* Exercícios
* Treinos
* Histórico
* Progresso

Também possui rotas específicas para manipulação da tabela pivô TreinoExercicios.

---

# Variáveis de Ambiente

Exemplo:

```env
DB_HOST=gymflow-db
DB_PORT=5432
DB_NAME=gymflow
DB_USER=gymflow_user
DB_PASSWORD=********

JWT_SECRET=********
JWT_EXPIRES_IN=1d

PORT=3000
```

---

# Comandos Úteis

Ver containers:

```bash
docker ps
```

Logs:

```bash
docker compose logs
```

Volumes:

```bash
docker volume ls
```

Redes:

```bash
docker network ls
```

---

# Encerrando a Aplicação

Parar os containers:

```bash
docker compose down
```

Remover containers e volumes:

```bash
docker compose down -v
```

---

# Estrutura do Projeto

```text
backend/
justificativa/
modelagem/
nginx/
queries/
scripts/
README.md
docker-compose.yml
```
