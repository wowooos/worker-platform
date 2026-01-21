const { Pool } = require('pg'); // importing the pool class from the [pg library]
                                // [Pool] is the thing that creates and manages our connection pool
//----------------------------------------------------------------------------------------------------

// const pool = new Pool({         // creating ONE pool that will last the entire time our server runs; create usually 10 connections by default.
//     user: 'postgres',
//     host: 'localhost',
//     database: 'worker_platform',
//     password: '123',
//     port: 5432,
//     client_encoding: 'UTF8'
// });

// updating my backend config. to use Railway instead of localhost.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // Required for Railway
    }
});

module.exports = pool;          // makes the [pool] available to other files

/** What's a pool?

Think of a swimming pool, but instead of water, it has database connections!

Connection Pool:
┌─────────────────┐
│ Connection 1    │ ← Available
│ Connection 2    │ ← In use
│ Connection 3    │ ← Available
│ Connection 4    │ ← In use
│ Connection 5    │ ← Available
└─────────────────┘
 
1. Your app needs to talk to database → Grabs a free connection from the pool
2. Uses it to run a query
3. Returns it to the pool for others to use

*/