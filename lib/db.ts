import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';

const connectionString = process.env.DATABASE_URL; // Make sure you have this environment variable set

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });