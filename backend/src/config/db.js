import { Pool } from 'pg';  // creates and manages our connection pool
//----------------------------------------------------------------------------------------------------

// Connection string approach:
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,  // SSL ativado, mas sem validar certificado -> Required for Railway -> Railway exige conexão SSL
    } : false,                      // SSL desativado completamente
    client_encoding: 'UTF8'
});

export default pool;