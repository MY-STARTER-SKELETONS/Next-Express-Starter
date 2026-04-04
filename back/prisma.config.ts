import "dotenv/config";
import { defineConfig } from "prisma/config";

/** Real URL required at runtime (`src/db/prisma.ts`) and for migrations; placeholder allows `prisma generate` before `.env` exists. */
const databaseUrl =
  process.env["DATABASE_URL"] ??
  "postgresql://user:password@localhost:5432/db?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
