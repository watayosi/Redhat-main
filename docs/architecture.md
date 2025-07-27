# Project Architecture

This monorepo contains two subprojects:

- **frontend** – Next.js + TypeScript application. Deployed to Vercel.
- **server** – Express API written in TypeScript. Deployed to Render and backed by Supabase.

## Frontend

The `frontend` folder holds the original v0.dev Next.js project. Its `package.json` provides scripts for development and production. The app expects the API base URL in the environment variable `NEXT_PUBLIC_API_URL`.

```
cd frontend
pnpm install
pnpm dev
```

## Server

The `server` directory contains an Express application using Supabase. Environment variables are loaded from `.env` (see `.env.example`).

Scripts:

```
cd server
pnpm install
pnpm dev      # run with ts-node-dev
pnpm build    # compile to dist/
```

### Key Endpoints

- `GET /api/jobs` – list jobs from Supabase `jobs` table
- `POST /api/jobs` – insert a new job
- `GET /api/carriers` – list carriers
- `POST /api/carriers` – create carrier
- `POST /api/quotes` – compute a quote using the `calculate_quote` function
- `GET /api/messages` – list messages
- `POST /api/messages` – post a message

## Environment Variables

```
SUPABASE_URL          Supabase project URL
SUPABASE_SERVICE_KEY  Service role key for Supabase
PORT                  Port for the Express server (default 3001)
```

## Deployment

See [deployment.md](deployment.md) for a step-by-step guide. In short:

1. Deploy the **frontend** directory to Vercel.
2. Deploy the **server** directory to Render with the environment variables listed above.
3. Set `NEXT_PUBLIC_API_URL` in Vercel to the public URL of your Render service.

This separation allows independent deployment and scaling of the UI and API layers while relying on Supabase for data storage and authentication.
