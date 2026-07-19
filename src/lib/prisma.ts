//
// prisma.ts
//
// This file initializes and configures the Prisma client for database access in the application.
// It sets up the PostgreSQL connection using the PrismaPg adapter and exports the database client instance.
//

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

/**
 * db is the configured PrismaClient instance for database operations.
 * It uses the PrismaPg adapter to connect to the PostgreSQL database.
 */
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

export { db };
