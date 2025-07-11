# Quickstart Deepl Backend

Este projeto é um backend Node.js com TypeScript, Express, TypeORM e integração com DeepL.

## Pré-requisitos
- Node.js >= 18
- npm >= 9
- Docker (opcional, para banco de dados)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd quickstart-deepl-backend
   ```

2. Instale as dependências:
   ```bash
   npm ci
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto.
   - Exemplo:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=senha
     DB_NAME=deepl
     DEEPL_API_KEY=sua-chave-deepl
     JWT_SECRET=sua-chave-jwt
     ```

## Banco de Dados

Você pode rodar o banco localmente ou via Docker:

### Usando Docker

```bash
docker-compose up -d
```

### Manualmente

- Crie um banco MySQL conforme as variáveis do `.env`.

## Migrações

Para rodar as migrações:
```bash
npm run build
npm run db:migrate
```

Para desfazer a última migração:
```bash
npm run db:revert
```

## Seed

Para popular o banco com dados iniciais:
```bash
npm run db:seed
```

## Rodando o Projeto

### Ambiente de desenvolvimento
```bash
npm run dev
```

### Ambiente de produção
```bash
npm run build
npm start
```

## Scripts úteis
- `npm run db:generate-migration` — Gera uma nova migration automaticamente com base nas alterações feitas nas entidades do TypeORM. Útil para manter o banco de dados sincronizado com o modelo do código. O arquivo gerado ficará em `src/migration/`.
- `npm run db:create-migration` — Cria um arquivo de migration vazio em `src/migration/`. Use para escrever manualmente alterações específicas no banco de dados que não são detectadas automaticamente.
- `npm run db:seed` — Executa o script de seed localizado em `src/seeder/seed.ts`, populando o banco de dados com dados iniciais ou de exemplo. Ideal para testes e desenvolvimento.
- `npm run mock` — Inicia o servidor de mock usando Killgrave, simulando respostas de APIs externas para facilitar testes locais. Os mocks são definidos em `imposters/imposters.imp.yml`.

## Estrutura do Projeto
- `src/` — Código fonte
- `src/entity/` — Entidades do banco
- `src/controllers/` — Controllers das rotas
- `src/routes/` — Rotas da API
- `src/services/` — Serviços de negócio
- `src/seeder/` — Seed de dados
- `src/middleware/` — Middlewares

## Observações
- Certifique-se de que as portas do banco e do backend não estejam em uso.
- Para integração com DeepL, obtenha uma chave de API em https://www.deepl.com/pro-api.

---
Dúvidas ou sugestões? Abra uma issue ou entre em contato.
