# CoachApp

CoachApp is a comprehensive platform for fitness coaching, built with a modern tech stack focusing on scalability and developer experience.

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Backend**: [NestJS](https://nestjs.com/) (Node.js Modular Monolith)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Prisma](https://www.prisma.io/) (Type-safe Database Client)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) (Required for local Supabase instance)
- Supabase CLI: `npm install -g supabase` (optional, can run via `npx`)

Follow these steps to set up the project locally.

### ⚡ Quick Start (Monorepo)
We have configured a root `package.json` to make running the project easier.

1.  **Install All Dependencies**:
    ```bash
    npm run install:all
    ```
2.  **Run Both Frontend & Backend**:
    ```bash
    npm run dev
    ```
    This will start the backend on port 3000 and frontend on port 3001.

### 🌳 Branching Strategy
Please refer to [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md) for our recommended git workflow.

### 1. Start Supabase (Database & Auth)

Initialize the local Supabase instance. This starts Postgres, Auth, Storage, and Studio services.

```bash
npx supabase start
```
> **Note**: If you encounter port conflicts, ensure ports `54321` (API), `54322` (DB), and `54323` (Studio) are free.

After starting, you can access the **Supabase Studio** dashboard at:
[http://127.0.0.1:54323](http://127.0.0.1:54323)

### 2. Backend Setup (NestJS)

Navigate to the `backend` directory, install dependencies, and start the development server.

```bash
cd backend
npm install
```

**Environment Variables**:
Configuration is handled via `.env`. Ensure `DATABASE_URL` matches your local Supabase instance:
```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

**Run Database Migrations**:
Apply the database schema using Prisma Migrate:
```bash
npx prisma migrate dev
```

**Start the Server**:
```bash
npm run start:dev
```
The backend API will be available at [http://localhost:3000](http://localhost:3000).

### 3. Frontend Setup (Next.js)

Open a new terminal, navigate to `frontend`, install dependencies, and start the app.

```bash
cd frontend
npm install
npm run dev
```
 The frontend application will run at [http://localhost:3001](http://localhost:3001) (or port 3000 if backend is not running).

## 🗄️ Database Management

We use Prisma for database interactions.

- **View Data**: Run `npx prisma studio` in the `backend` folder to open a visual database editor.
- **Update Schema**: Modify `backend/prisma/schema.prisma` and run `npx prisma migrate dev --name <migration_name>` to apply changes.
- **Generate Client**: If you change the schema, run `npx prisma generate` to update the type-safe client.

## 📂 Project Structure

- `backend/`: NestJS source code.
  - `src/`: Application modules, controllers, and services.
  - `prisma/`: Database schema and migrations.
- `frontend/`: Next.js source code.
  - `src/app/`: Application routes and pages.
  - `src/components/`: Reusable UI components.
- `supabase/`: Supabase configuration (migrations, config.toml).

## 📄 License

This project is licensed under the UNLICENSED license.
