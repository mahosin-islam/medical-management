# AGENTS.md

## Stack
- Next.js 16 (App Router) + TypeScript 5 (strict), React 19
- Tailwind CSS v4 + PostCSS
- MongoDB native driver (server-only), BetterAuth, TanStack Query, Pusher (server + client), Framer Motion, Zod, react-hook-form

## Commands
- `pnpm dev` - start dev server with `--turbo`
- `pnpm build` - Next build
- `pnpm start` - start production server
- `pnpm lint` - **currently skips linting** (`echo 'Skipping Linting during build'`) — do not rely on it for checks

## Key architecture
- **Auth**: BetterAuth via `src/lib/auth.ts` with MongoDB adapter using `db/client` from `src/lib/mongodb.ts`. User has extra `role` field (default `"patient"`). API routes handled by `src/app/api/auth/[...all]/route.ts` (exports GET/POST via `toNextJsHandler`). Client helper `src/lib/auth-client.ts` auto-detects baseURL (browser origin or `NEXT_PUBLIC_APP_URL`/localhost), uses `inferAdditionalFields<typeof auth>()`.
- **DB**: `src/lib/mongodb.ts` caches `MongoClient` globally as `_mongoClient` only in `NODE_ENV === "development"` to avoid connection leaks; in production it creates a new `MongoClient` (no global cache). Always import `db`/`client` from here; throws if `MONGODB_URL` missing.
- **Route protection**: `src/middleware.ts` fetches session from `/api/auth/get-session` using request cookies. Redirects unauthenticated users from `/admin/*`, `/doctor/*`, `/patient/*` to `/login`. Enforces role: non-admin hitting `/admin/*` → `/`, non-doctor `/doctor/*` → `/`, non-patient `/patient/*` → `/`. Matcher only protects those three prefixes.
- **Realtime**: Server Pusher in `src/lib/pusher.ts` using `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER` (TLS). Client usage appears via `pusher-js` in features (chat/messaging).
- **Imports**: Path alias `@/*` → `./src/*` (tsconfig). Use it.
- **Images**: `next.config.ts` allows remote images from unsplash, i.ibb.co.com, bombayhosp.in, cureandcarehospital.com, res.cloudinary.com.
- **CORS**: API routes get explicit CORS headers allowing credentials/origin `https://medical-management-5wny.vercel.app` and common methods/headers (see next.config). If changing origin, update there.
- **Providers**: App wrapped with `ThemeProvider` (`src/components/shared/ThemeProvider.tsx`, next-themes: class attribute, defaultTheme `"dark"`, `enableSystem={false}`, themes `["light","dark"]`) and `QueryProvider` (`src/providers/QueryProvider.tsx`, TanStack Query defaults: `staleTime` 3 min, `refetchOnWindowFocus: false`).
- **Routes**: App Router with route groups `(auth)`, `(marketing)`, `(dashboard)`. Dashboards split by role under `(dashboard)/(admin|doctor|patient)`. APIs under `src/app/api/*`.

## Environment
Required (inferred): `MONGODB_URL`, `GOOGLE_CLIEN_ID` (typo in `src/lib/auth.ts`), `GOOGLE_CLIENT_SECRET`, `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`. See `.gitignore` — `.env*` ignored.

## Gotchas
- `pnpm lint` is a no-op in this repo (`echo 'Skipping Linting during build'`); don't expect ESLint to run via that script.
- Middleware does a live `fetch` to `/api/auth/get-session` per request for protected prefixes — keep that in mind if changing auth/session endpoint.
- MongoDB client: dev uses global cached client; production creates a new `MongoClient` (no global cache) per current implementation.
- Admin accounts are described as structurally locked in README (role changes restricted by admin UI logic) — respect existing guards.
- CORS origin is hardcoded to a specific Vercel deployment in `next.config.ts`.




<!-- Before starting any work: -->

1. Read AGENTS.md.
2. Read docs/architecture.md.
3. Read docs/project-context.md.
4. Inspect the relevant current code and Git changes.
5. Summarize the current project state, relevant existing implementation, known issues, and unfinished work related to my request.

Do not assume the documentation is always up to date. Verify relevant details against the current code.

Ask me what I want to work on if I have not specified a task. Do not modify any files until the task is clear.