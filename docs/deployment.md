# Deployment Guide

This document explains how to deploy the frontend to **Vercel** and the backend to **Render**.

## Deploying the Frontend (Vercel)

1. Log in to [Vercel](https://vercel.com/) and create a **New Project**.
2. Import this repository from your Git provider.
3. When configuring the project, set the **root directory** to `frontend`.
4. The default build settings for a Next.js app work. Ensure the **Build Command** is `pnpm install && pnpm build` and the **Output Directory** is `.next`.
5. Add an environment variable named `NEXT_PUBLIC_API_URL` with the public URL of your Render backend.
6. Click **Deploy**. Vercel will build and deploy the site.

## Deploying the Backend (Render)

1. Log in to [Render](https://render.com/) and create a new **Web Service**.
2. Choose this repository and set the **root directory** to `server`.
3. Set the **Build Command** to `pnpm install && pnpm run build`.
4. Set the **Start Command** to `pnpm start`.
5. Define the following environment variables:
   - `SUPABASE_URL` – your Supabase project URL
   - `SUPABASE_SERVICE_KEY` – the service role key
   - `PORT` – (optional) the port Render should expose, e.g. `3001`
6. After deployment, note the service URL and use it as the value of `NEXT_PUBLIC_API_URL` in your Vercel project.

With these two deployments in place, the frontend will communicate with the Express API hosted on Render, and Supabase will handle data storage and authentication.
