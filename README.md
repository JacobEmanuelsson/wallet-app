# Wallet app

Next.js frontend and Express API with a minimal Better Auth connection setup using Prisma and PostgreSQL.

## Connection setup

- API configuration: apps/api/src/lib/auth.js
- Prisma connection: apps/api/src/lib/prisma.js
- React client: apps/web/src/lib/auth-client.js
- Better Auth handler: /api/auth/* on the Express API
- Environment examples: apps/api/.env.example and apps/web/.env.example

The API loads apps/api/.env. Keep DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, CORS_ORIGIN, and PORT there. The frontend uses NEXT_PUBLIC_API_URL (default http://localhost:4000). Use localhost consistently on both sides for local cookies.

## Local startup

Start Docker Desktop, then run these commands from the repository root:

```powershell
docker compose up -d postgres
pnpm db:deploy
pnpm db:generate
pnpm dev
```

The API runs at http://localhost:4000 and the frontend at http://localhost:3000. GET http://localhost:4000/api/auth/ok checks that the Better Auth handler is mounted.

The migration adds Better Auth's core tables. It has not yet been applied because the local Docker database was unavailable during setup.

Authentication methods, application flows, route protection, and UI are left for you to implement. Existing empty placeholders remain empty.
