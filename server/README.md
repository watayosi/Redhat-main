# Server

This folder contains the Express API for the Red Hat Solution App. The API connects to Supabase and is written in TypeScript.

## Setup

Run the following commands from this directory:

```bash
pnpm install
pnpm dev      # run with ts-node-dev
pnpm build    # compile TypeScript to dist/
```

Use `pnpm start` to run the compiled version.

## Environment Variables

Create a `.env` file based on `.env.example` and provide the following values:

- `SUPABASE_URL` – URL of your Supabase project
- `SUPABASE_SERVICE_KEY` – service role key for Supabase
- `PORT` – port for the Express server (defaults to `3001`)

## More Information

Additional details about the project structure and endpoints are available in the main [architecture documentation](../docs/architecture.md).
