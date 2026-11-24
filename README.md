# Full Stack Open — Part 14: Using Relational Databases and Next.js

A blog application rebuilt with Next.js (App Router), PostgreSQL via Neon, and Drizzle ORM, covering server actions, authentication, a personal reading list, an API route, MDX, and end-to-end testing.

## 🔗 Deployment

- Live app: https://fullstackopen-part14-ten.vercel.app/

## 📦 What's here

- **Next.js App Router** — file-based routing, Server Components, Server Actions, Route Handlers.
- **Drizzle ORM + PostgreSQL (Neon)** — schema in `db/schema.ts`, migrations in `drizzle/`, relations defined for the users ↔ blogs ↔ reading-list join.
- **NextAuth.js** — credentials-based login, bcrypt-hashed passwords, session-aware navigation.
- **Server Actions** (`actions/`) — form handling for login, registration, blog creation, likes, and the reading list, with `useActionState` for field-level validation and error display.
- **Notification system** — a React Context (`components/NotificationContext.tsx`) providing toast-style feedback across the app.
- **Personal reading list** — blogs a user adds are automatically in their own reading list; other users can add any blog to theirs and mark it read/unread from `/me`.
- **Personal API token** — generated from `/me`, used to authenticate `GET /api/me`.
- **Testing-only API routes** (`/api/testing/reset`, `/api/testing/users`) — disabled in production, used to reset and seed the database for end-to-end tests.
- **Playwright** end-to-end test suite (`tests/`), with a matching GitHub Actions workflow.
- **MDX** homepage, styled via a scoped `.markdown` CSS class.

## 🛠️ Running

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build && npm run start
```

**Apply database migrations** (local or against the Vercel/Neon database, depending on `DATABASE_URL`):
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

**Browse the database directly:**
```bash
npx drizzle-kit studio
```

## 👤 Managing users

**Set or reset a user's password directly** (bypasses the registration form):
```bash
npx tsx set-password.ts
```

## Links

- Repository for Full Stack Open Part 14 Next.js answers: https://github.com/Dax-Goonies/fullstackopen-part14
- Live app via Vercel: https://fullstackopen-part14-ten.vercel.app/


