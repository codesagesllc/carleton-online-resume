import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';

// Database connection configuration with security enhancements
interface DatabaseConfig {
  connectionString: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  max: number;
  min: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

// Environment validation
const validateEnvironment = (): DatabaseConfig => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Validate connection string format
  if (!connectionString.startsWith('postgresql://') && !connectionString.startsWith('postgres://')) {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection string');
  }

  return {
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
    min: parseInt(process.env.DB_MIN_CONNECTIONS || '1', 10),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
  };
};

// Connection pool management class for better resource handling
class DatabaseManager {
  private static instance: DatabaseManager;
  private pool: Pool;
  private db: ReturnType<typeof drizzle>;

  private constructor() {
    const config = validateEnvironment();
    
    this.pool = new Pool({
      connectionString: config.connectionString,
      ssl: config.ssl,
      max: config.max,
      min: config.min,
      idleTimeoutMillis: config.idleTimeoutMillis,
      connectionTimeoutMillis: config.connectionTimeoutMillis,
    });

    // Enhanced error handling
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    this.pool.on('connect', (client) => {
      console.log('Connected to PostgreSQL database');
    });

    this.pool.on('remove', (client) => {
      console.log('Client removed from pool');
    });

    this.db = drizzle(this.pool, { schema });
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public getDatabase() {
    return this.db;
  }

  public async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      console.log('Database connection test successful');
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  public async closeConnections(): Promise<void> {
    try {
      await this.pool.end();
      console.log('Database connections closed');
    } catch (error) {
      console.error('Error closing database connections:', error);
    }
  }

  public getPoolStats() {
    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount,
    };
  }
}

// Export the database instance
export const db = DatabaseManager.getInstance().getDatabase();

// Export utility functions
export const testDbConnection = () => DatabaseManager.getInstance().testConnection();
export const closeDbConnections = () => DatabaseManager.getInstance().closeConnections();
export const getDbPoolStats = () => DatabaseManager.getInstance().getPoolStats();

// Error handling utility
export const handleDatabaseError = (error: unknown, operation: string) => {
  console.error(`Database error during ${operation}:`, error);
  
  if (error instanceof Error) {
    // Log specific error details for debugging
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
  
  // Don't expose internal error details to client
  throw new Error(`Database operation failed: ${operation}`);
};

// Connection health check for monitoring
export const checkDatabaseHealth = async () => {
  try {
    const manager = DatabaseManager.getInstance();
    const isConnected = await manager.testConnection();
    const stats = manager.getPoolStats();
    
    return {
      isConnected,
      poolStats: stats,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      isConnected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
};

// Graceful shutdown handler
if (process.env.NODE_ENV === 'production') {
  process.on('SIGINT', async () => {
    console.log('Received SIGINT, closing database connections...');
    await closeDbConnections();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, closing database connections...');
    await closeDbConnections();
    process.exit(0);
  });
}