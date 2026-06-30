# Todo App — Express.js + Supabase + Swagger

A simple Todo CRUD API.

## Stack
- Express.js (REST API)
- Supabase (Postgres database)
- Swagger (API docs via `swagger-jsdoc` + `swagger-ui-express`)

## 1. Setup Supabase

1. Create a project at https://supabase.com
2. Go to **SQL Editor** → **New query**, paste the contents of `schema.sql`, and run it. This creates the `todos` table.
3. Go to **Project Settings → API** and copy your:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** (or service_role key for server-side full access) → `SUPABASE_KEY`

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```
PORT=3000
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-role-key
```

## 3. Install dependencies

```bash
npm install
```

## 4. Run the server

```bash
npm start
# or for auto-reload during development
npm run dev
```

The API runs at `http://localhost:3000`.

## 5. Swagger Docs

Open `http://localhost:3000/api-docs` in your browser for interactive API documentation.

## Endpoints

| Method | Endpoint     | Description        |
|--------|--------------|---------------------|
| GET    | /todos       | Get all todos       |
| GET    | /todos/:id   | Get a single todo   |
| POST   | /todos       | Create a new todo   |
| PUT    | /todos/:id   | Update a todo       |
| DELETE | /todos/:id   | Delete a todo       |

### Example: Create a todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

## Table schema (`todos`)

| Column        | Type        | Notes                          |
|---------------|-------------|---------------------------------|
| id            | bigint      | Primary key, auto-increment    |
| title         | text        | Required                       |
| description   | text        | Optional                       |
| is_completed  | boolean     | Default `false`                |
| created_at    | timestamptz | Default `now()`                |
| updated_at    | timestamptz | Auto-updated via trigger       |
