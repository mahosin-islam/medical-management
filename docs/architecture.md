# docs/architecture.md

## Actual folder structure (verified)
```
src/
  app/                    # Next.js App Router
    (auth)/               # Auth route group (login, signup)
    (dashboard)/          # Role-based dashboards (admin, doctor, patient)
    (marketing)/          # Public pages (home, doctors, departments, about, contact)
    api/                  # API routes
    layout.tsx            # Root layout (ThemeProvider, QueryProvider, Toaster)
    globals.css
    loading.tsx
    not-found.tsx
  components/
    web/                  # Shared web components (navbar, footer, sidebar, etc.)
    page/                 # Page-specific components
    shared/               # Shared UI (ThemeProvider, ThemeToggle)
    Buttons/              # Button components
    Common/               # Common components
  lib/
    auth.ts               # BetterAuth server config
    auth-client.ts        # BetterAuth client
    mongodb.ts            # MongoDB connection
    pusher.ts             # Pusher server
  providers/
    QueryProvider.tsx     # TanStack Query provider
  middleware.ts           # Route protection middleware
```
Route groups: `(auth)`, `(marketing)`, `(dashboard)`. Dashboards split under `(dashboard)/(admin|doctor|patient)`. APIs under `src/app/api/*`.

## Technology stack and dependencies (verified)
From `package.json`:
- Next.js 16.2.7 (App Router), React 19.2.4, TypeScript ^5
- Tailwind CSS v4 (`@tailwindcss/postcss`), PostCSS
- `mongodb` ^7.3.0 (native driver)
- `better-auth` ^1.6.15
- `@tanstack/react-query` ^5.101.0
- `pusher` ^5.3.4, `pusher-js` ^8.5.0
- `next-themes` ^0.4.6, `framer-motion` ^12.40.0
- `react-hook-form` ^7.78.0, `@hookform/resolvers` ^5.4.0, `zod` ^4.4.3
- `react-hot-toast` ^2.6.0, `sweetalert2` ^11.26.25, `recharts` ^3.8.1, `react-icons` ^5.6.0, `lucide-react` ^1.17.0
- Dev: `@types/*`, `eslint` ^9, `eslint-config-next` 16.2.7, `tailwindcss` ^4

## Authentication and role-based route protection (verified)
- **Server auth**: `src/lib/auth.ts` uses BetterAuth with MongoDB adapter (`mongodbAdapter(db, { client })` from `src/lib/mongodb.ts`). Email/password enabled. Google provider configured with `process.env.GOOGLE_CLIEN_ID` (typo) and `process.env.GOOGLE_CLIENT_SECRET`. User has additional field `role` with type `string`, required `false`, default `patient`.
- **Auth API**: `src/app/api/auth/[...all]/route.ts` exports `GET, POST` via `toNextJsHandler(auth)`.
- **Auth client**: `src/lib/auth-client.ts` creates client with dynamic baseURL (browser `window.location.origin`, else `NEXT_PUBLIC_APP_URL` or `http://localhost:3000`), uses `inferAdditionalFields<typeof auth>()`.
- **Middleware**: `src/middleware.ts` fetches `GET {origin}/api/auth/get-session` with request cookies. If no session/user and path starts with `/admin`, `/doctor`, or `/patient` → redirect to `/login`. If session exists: if `/admin/*` and role != `admin` → `/`; if `/doctor/*` and role != `doctor` → `/`; if `/patient/*` and role != `patient` → `/`. Matcher: `/admin/:path*`, `/doctor/:path*`, `/patient/:path*`.

## Database connection and schema (verified)
- **Connection**: `src/lib/mongodb.ts` reads `process.env.MONGODB_URL` (throws if missing). Dev (`NODE_ENV === "development"`): caches `MongoClient` on `global._mongoClient`. Prod: creates new `MongoClient` (no global cache). Exports `client, db` (db from default database).
- **Collections observed in code**:
  - `user` (BetterAuth users; `src/app/api/admin/users/route.ts` reads/writes role)
  - `patients` (read in `src/app/(dashboard)/patient/profile/page.tsx`)
  - `doctors` (read/updated in doctor pages, public doctor pages, appointments booking updates `bookedSchedules`)
  - `appointments` (created/queried across patient/doctor/admin flows)
  - `messages` / chat collections appear in chat/messaging routes (e.g., `src/app/api/messages/route.ts`, `src/app/api/chat/*`, `src/app/api/patient/messages/*`) — exact collection names vary by route; needs verification.
- **Schema**: Needs verification (no schema files/migrations found). Types are ad-hoc in components/routes. Collections observed: `user`, `patients`, `doctors`, `appointments`; messaging/chat collections: `messages` used by `src/app/api/messages/route.ts` and chat routes (`src/app/api/chat/*`, `src/app/api/patient/messages/*`) — exact collection names may vary.

## API routes and important data flows (verified)
- **Auth**: `src/app/api/auth/[...all]/route.ts` (BetterAuth)
- **Admin**: `src/app/api/admin/users/route.ts` GET all users from `user` collection, PATCH updates role by `_id` (ObjectId). `src/app/api/admin/*` also includes doctors, profile routes.
- **Appointments**: `src/app/api/appointments/route.ts` POST creates appointment in `appointments` with validation (min 50% payment), computes `paymentStatus`/`status`/`dueAmount`, inserts, updates doctor `bookedSchedules.{monthStr}.{dateStr}.serials` via `$addToSet`. `src/app/api/doctor/appointments/route.ts`, `src/app/api/patient/appointments/route.ts`, `src/app/api/patient/appointment/route.ts` exist.
- **Doctors/public**: `src/app/api/home/doctors/route.ts`, `src/app/api/home/doctors/[id]/route.ts`, `src/app/api/doctor/search/route.ts` exist.
- **Messaging/chat**: `src/app/api/messages/route.ts`, `src/app/api/chat/send/route.ts`, `src/app/api/chat/history/route.ts`, `src/app/api/patient/messages/*`, `src/app/api/doctor/messenger/route.ts` exist (Pusher used for realtime).
- **Profiles/updates**: `src/app/api/doctor/profileUpdate/route.ts`, `src/app/api/patient/profileUpdate/route.ts`, `src/app/api/admin/profile/route.ts`, etc.

## Providers and realtime functionality (verified)
- **Root providers**: `src/app/layout.tsx` wraps children with `ThemeProvider` (`src/components/shared/ThemeProvider.tsx`) and `QueryProvider` (`src/providers/QueryProvider.tsx`), adds `Toaster` from `react-hot-toast`.
- **ThemeProvider**: next-themes, `attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`, `themes={["light","dark"]}`.
- **QueryProvider**: TanStack QueryClient with `defaultOptions.queries.staleTime = 3 * 60 * 1000`, `refetchOnWindowFocus = false`.
- **Realtime**: Server Pusher in `src/lib/pusher.ts` (uses `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`, TLS). Client uses `pusher-js` instantiated in `src/app/(dashboard)/doctor/messages/DoctorMessengerClient.tsx` and `src/app/(dashboard)/patient/messages/PatientChatContainer.tsx` with `process.env.NEXT_PUBLIC_PUSHER_KEY` and `process.env.NEXT_PUBLIC_PUSHER_CLUSTER` (default `ap2`), subscribing to channel `chat-{sorted(senderId, receiverId)}` and binding `new-message`. API routes `src/app/api/messages/route.ts` and `src/app/api/chat/send/route.ts` trigger events via `pusherServer`.
- **Images/CORS**: `next.config.ts` allows remote images (unsplash, i.ibb.co.com, bombayhosp.in, cureandcarehospital.com, res.cloudinary.com). API routes get CORS headers with origin `https://medical-management-5wny.vercel.app` and credentials/methods/headers as configured.

## Notes
- Path alias `@/*` → `./src/*` (tsconfig). Imports use alias.
- `pnpm lint` is a no-op. `next.config.ts` has `typescript.ignoreBuildErrors: false`.
- Middleware does live fetch to `/api/auth/get-session` per request for protected prefixes.
