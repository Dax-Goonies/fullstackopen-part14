# Full Stack Open — Part 14: Using Relational Databases and Next.js

A blog application rebuilt with Next.js (App Router), PostgreSQL via Neon, and Drizzle ORM, covering server actions, authentication, a personal reading list, an API route, MDX, and end-to-end testing.

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

## 🧪 Testing

**Run the end-to-end test suite** (requires the app running locally and a dedicated test database):
```bash
npm run test:e2e
```

Tests rely on two production-disabled API routes to reset and seed the database:

- `DELETE /api/testing/reset` — empties all tables.
- `POST /api/testing/users` — creates a user directly, e.g.:
  ```json
  {
    "username": "testuser",
    "name": "Test User",
    "password": "testpass123"
  }
  ```

The suite also runs automatically on GitHub Actions on every push, using repository secrets (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`) pointing at a separate test database.

## 🧹 Code style

**Format the whole codebase with Prettier:**
```bash
npx prettier --write .
```

**Generate a random secret** (for `NEXTAUTH_SECRET`, etc.):
```bash
echo "$(openssl rand -base64 32)"
```

## 🔗 Links

- Repository for Full Stack Open Part 14 Next.js answers: https://github.com/Dax-Goonies/fullstackopen-part14
- Base template for a Next.js app: https://github.com/fullstack-hy2020/nextjs-notes
- Live app via Vercel: https://fullstackopen-part14-ten.vercel.app/
- Workflow passing: https://github.com/Dax-Goonies/fullstackopen-part14/actions