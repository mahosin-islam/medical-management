# docs/project-context.md

## Project purpose and main features (verified)
From README and codebase:
- **Purpose**: Healthcare platform bridging doctors and patients with digitized medical management, role-based access control, modern UI/UX.
- **Roles**: Patient, Doctor, Admin with strict separation.
- **Key features observed**:
  - Multi-role authorization (patient/doctor/admin)
  - Admin can toggle user roles via `/api/admin/users` (PATCH); README states admin accounts are "locked structurally" (role changes restricted by admin UI logic) — UI enforcement present in admin UI, middleware/API-level restriction: Needs verification
  - Doctor profiles, search/filter, booking
  - Appointments with payment validation (min 50% at booking) and status/paymentStatus computation (`src/app/api/appointments/route.ts`)
  - Messaging/chat between roles with Pusher realtime
  - Dashboards per role with appointments, patients, prescriptions, messages, earnings, schedule, etc.
  - Theme support (light/dark) via next-themes
  - TanStack Query for data fetching/caching

## Features verified as implemented
- **Auth**: BetterAuth email/password + Google configured; role field with default patient.
- **Route protection**: Middleware enforces auth + role for `/admin/*`, `/doctor/*`, `/patient/*`.
- **Booking flow**: `BookingWidget` calls `POST /api/appointments`, validates 50% payment, updates doctor schedules.
- **Admin role management**: `src/app/api/admin/users/route.ts` GET/PATCH roles.
- **Dashboards**: Pages exist for admin/doctor/patient with appointments, messages, profiles, etc.
- **Realtime**: Pusher server configured; messaging UI present with client `pusher-js` in doctor/patient chat components (channels `chat-{sortedIds}`, event `new-message`).
- **Providers**: ThemeProvider (dark default, class-based), QueryProvider (3min staleTime, no refetchOnWindowFocus).

## Known issues and technical limitations (verified)
- **Linting**: `pnpm lint` is a no-op (`echo 'Skipping Linting during build'`) — no ESLint enforcement via script.
- **Google env var typo**: `GOOGLE_CLIEN_ID` used in `src/lib/auth.ts:23` (misspelled). Correct env var name is as written but typo exists.
- **CORS hardcoded**: Origin hardcoded to `https://medical-management-5wny.vercel.app` in `next.config.ts:42`. Local/dev origins not explicitly allowed in that header block — may affect cross-origin requests in non-deployed environments.
- **Middleware does live fetch**: `src/middleware.ts` calls `/api/auth/get-session` per request for protected prefixes (extra network call per request to those routes).
- **MongoDB connection**: Prod creates new `MongoClient` per module load (no global cache) per current implementation; dev uses global cache. This is the implemented pattern but can behave differently across serverless instances.
- **Admin "locked" accounts**: README states structurally locked; enforcement mechanism (middleware/API) not clearly visible in sampled code — UI restriction is claimed. Needs verification.
- **Client Pusher setup**: `pusher-js` instantiated directly in `src/app/(dashboard)/doctor/messages/DoctorMessengerClient.tsx` and `src/app/(dashboard)/patient/messages/PatientChatContainer.tsx` using `NEXT_PUBLIC_PUSHER_KEY`/`NEXT_PUBLIC_PUSHER_CLUSTER` (no shared client lib).

## Important implementation decisions (verified)
- **Global MongoDB cache only in dev**: Avoids hot-reload connection leaks in development; prod uses fresh client (current code).
- **Middleware session check via BetterAuth endpoint**: Uses `fetch` to `/api/auth/get-session` with cookies rather than in-process session resolution.
- **Role stored as additional field in BetterAuth user**: Default `patient`, managed via admin API.
- **Booking enforces 50% minimum payment**: Computed server-side in `POST /api/appointments`.
- **Theme default dark, system disabled**: `next-themes` configured explicitly.
- **Query caching**: 3min staleTime, no window focus refetch.

## Remaining work, only when identifiable from the code or existing documentation
- **Env configuration**: Need to set `MONGODB_URL`, `GOOGLE_CLIEN_ID` (note typo), `GOOGLE_CLIENT_SECRET`, `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`, and possibly `NEXT_PUBLIC_APP_URL` for auth client fallback. — identifiable from code/env usage.
- **CORS/local dev**: If developing locally with different origins, `next.config.ts` CORS origin may need adjustment. — identifiable from config.
- **Linting setup**: `pnpm lint` is no-op; project has ESLint deps but script not configured to run them. — identifiable from package.json.
- **Client Pusher initialization**: Verified — instantiated in `DoctorMessengerClient.tsx` and `PatientChatContainer.tsx` with public env vars and channel naming `chat-{sorted(senderId,receiverId)}`. No shared client lib.
- **Collection/schema details**: Full schema for `doctors`, `appointments`, messages/chat collections not visible. — Needs verification.
- **Admin lock enforcement**: Confirm API/middleware prevents unauthorized role changes beyond UI. — Needs verification.
- **BetterAuth session endpoint behavior**: Confirm `/api/auth/get-session` is the expected endpoint in this BetterAuth version/setup. — Needs verification (works with current code but not explicitly documented in repo).
