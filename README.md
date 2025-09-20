# NestJS Professional Backend Template

A robust and scalable backend template built with NestJS, TypeORM, PostgreSQL, and Redis. This template is designed to provide a professional foundation for your next project, incorporating best practices for configuration, validation, error handling, and API documentation.

## ✨ Core Features

-   **Framework:** Built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.
-   **Database:** Uses [TypeORM](https://typeorm.io/) with a [PostgreSQL](https://www.postgresql.org/) database.
-   **Caching:** Includes [Redis](https://redis.io/) integration for caching or other background tasks.
-   **Containerization:** Comes with a ready-to-use Docker setup for local development.
-   **Configuration:** Centralized and environment-based configuration using the `@nestjs/config` module.
-   **Validation:** Powerful request validation out-of-the-box using `class-validator` and a global `ValidationPipe`.
-   **Error Handling:** A smart global exception filter that gracefully handles both NestJS and raw database errors, providing clean, user-friendly responses.
-   **Response Formatting:** A global interceptor that wraps all successful responses in a consistent JSON structure.
-   **Database Migrations:** Full support for TypeORM migrations to manage your database schema changes safely.
-   **API Documentation:** Automatic and rich API documentation generation using Swagger (OpenAPI) and the NestJS Swagger Plugin.

---

## 🚀 Getting Started

Follow these steps to get your local development environment up and running.

### 1. Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [NPM](https://www.npmjs.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)

### 2. Clone the Repository

---CODE---bash
git clone <your-repository-url>
cd <project-folder>
---CODE---

### 3. Install Dependencies

---CODE---bash
npm install
---CODE---

### 4. Set Up Docker Environment

Make sure Docker Desktop is running. Then, execute the following commands to start the PostgreSQL and Redis containers.

---CODE---bash
# Start PostgreSQL container
docker run --name dev_postgres -p 5432:5432 -e POSTGRES_PASSWORD=your_secure_password -v pgdata:/var/lib/postgresql/data -d postgres:16

# Start Redis container
docker run --name dev_redis -p 6379:6379 -d redis:7
---CODE---
> **Note:** Replace `your_secure_password` with a strong password of your choice. You will need this for the next step.

### 5. Configure Environment Variables

Create a `.env` file in the root of the project by copying the example file.

---CODE---bash
cp .env.example .env
---CODE---

Now, open the `.env` file and fill in your database password.

---CODE---env
# .env file

# App
PORT=3000

# PostgreSQL Database Connection
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password # <-- IMPORTANT: Use your chosen password
DB_DATABASE=postgres

# Redis Connection
REDIS_HOST=localhost
REDIS_PORT=6379
---CODE---

---

## 🏃‍♂️ Running the Application

### Development Mode

To start the application in watch mode (rebuilds on file change):

---CODE---bash
npm run start:dev
---CODE---

The application will be available at `http://localhost:3000`.

### API Documentation

Once the application is running, you can access the interactive Swagger API documentation at:

[**http://localhost:3000/docs**](http://localhost:3000/docs)

---

## 🛠️ Development Workflow

### Code Generation with NestJS CLI

Use the NestJS CLI to quickly scaffold new application components. This ensures your project follows a consistent structure and modules are automatically updated.

---CODE---bash
# Generate a new module
nest g mo <module-name>

# Generate a new controller
nest g co <controller-name>

# Generate a new service
nest g s <service-name>
---CODE---

#### Example: Creating a "Products" Feature

1.  **Generate the module:** This creates `products.module.ts` and adds it to `app.module.ts`.
    ---CODE---bash
    nest g mo products
    ---CODE---
2.  **Generate the controller:** This creates `products.controller.ts` and adds it to `products.module.ts`.
    ---CODE---bash
    nest g co products
    ---CODE---
3.  **Generate the service:** This creates `products.service.ts` and adds it to `products.module.ts`.
    ---CODE---bash
    nest g s products
    ---CODE---
4.  **Manually create the entity:** Create `src/products/entities/product.entity.ts`.
5.  **Manually update the module:** Add `TypeOrmModule.forFeature([Product])` to the `imports` array in `products.module.ts`.

### Database Migrations

This template uses TypeORM migrations to manage database schema changes safely.

1.  **Generate a Migration:** After changing your entities, generate a new migration file.
    ---CODE---bash
    npm run migration:generate <MigrationNameInPascalCase>
    ---CODE---
2.  **Run Migrations:** Apply all pending migrations to the database.
    ---CODE---bash
    npm run migration:run
    ---CODE---
3.  **Revert a Migration:** Undo the last applied migration.
    ---CODE---bash
    npm run migration:revert
    ---CODE---

---

## 📦 Core APIs & Features Explained

### Health Check API

A simple, unauthenticated endpoint to verify that the service is running and responsive. This is essential for uptime monitoring and container orchestration.

-   **Endpoint:** `GET /health`
-   **Success Response (200 OK):**
    ---CODE---json
    {
      "success": true,
      "data": "OK",
      "timestamp": "2025-09-21T00:00:00.000Z"
    }
    ---CODE---

### Global Exception Filter

Located at `src/common/filters/all-exceptions.filter.ts`, this filter catches all unhandled exceptions. It intelligently translates raw PostgreSQL errors (like unique constraint violations) into user-friendly HTTP responses (e.g., `409 Conflict`).

### Global Response Interceptor

Located at `src/common/interceptors/response.interceptor.ts`, this interceptor wraps all successful API responses in a consistent `{ "success": true, "data": ... }` structure.

### Automatic Swagger Documentation

The `nest-cli.json` is configured with the `@nestjs/swagger` plugin to automatically generate API documentation from your DTOs and JSDoc comments, keeping your code clean and your documentation rich.

---

## 📜 Available Scripts

-   `start:dev`: Runs the app in watch mode.
-   `build`: Compiles the TypeScript source code into JavaScript.
-   `start:prod`: Runs the built application in production mode.
-   `lint`: Lints the codebase using ESLint.
-   `test`: Runs unit tests using Jest.
-   `migration:generate <MigrationName>`: Generates a new migration file.
-   `migration:run`: Runs all pending migrations.
-   `migration:revert`: Reverts the last applied migration.


Authored and maintained by **Usman Ashfi**.