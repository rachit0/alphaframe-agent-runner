# alphaframe-agent-runner
Assignment for Full Stack Developer
# Alphaframe Agent Runner

A minimal agent runner with a Next.js UI, TypeScript/Fastify backend, MySQL/Redis storage, and OpenAI integration.

## Architecture
- **Frontend**: Next.js + React + shadcn/ui for prompt input and tool selection.
- **Backend**: Fastify + TypeScript, with Zod for validation, OpenAI for response formatting.
- **Database**: MySQL for run storage, Redis for caching last 10 runs.
- **DevOps**: Docker Compose for local setup.

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Copy `env.example` to `.env` and fill in your OpenAI API key.
3. Run `docker compose up` to start the app, MySQL, and Redis.
4. The MySQL database is initialized with the `runs` table via `/db/init.sql`.
5. Visit `http://localhost:3000` for the UI.

## Database Verification
Connect to MySQL to verify the `runs` table:
```bash
docker exec -it <mysql-container-name> mysql -u user -ppassword alphaframe
SELECT * FROM runs;