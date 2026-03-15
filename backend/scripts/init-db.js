/**
 * Creates the [worker_platform] DB, if it doesn't exist
 * Creates the [worker] table
 */

import dotenv from 'dotenv';
dotenv.config();    // loads the .env variables to [process.env]
// dotenv is needed cause im running these scripts without running the server (which would have the --env-file flag to load the .env variables to [process.env])

import pg from 'pg';
//-----------------------------------------------------------------------------------

const { Client } = pg;
const DB_NAME = process.env.DB_NAME;

async function initDatabase(){
    // Step 1: Create database using Client (connect to 'postgres')
    const client = new Client({
        connectionString: process.env.DATABASE_URL.replace(`/${DB_NAME}`, '/postgres')
    });

    try{
        await client.connect(); 
        console.log(`✅ Connected to PostgreSQL -> ${client.database}`);

        // Check if database exists:
        const dbCheck = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]
        );

        if(dbCheck.rows.length === 0){
            await client.query(`CREATE DATABASE ${DB_NAME}`);
            console.log(`✅ Database '${DB_NAME}' created`);
        }else{
            console.log(`⚠️  Database '${DB_NAME}' already exists -> It's most likely that the [worker] table also already exists.`);
        }

        await client.end();

        // Step 2: Create [worker] table using Pool

        // dynamic importing the pool -> runs after dotenv already loaded all the env. files (including the ones the pool will need ;)).
        const { default: pool } = await import('../src/config/db.js');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS worker (
                id BIGSERIAL NOT NULL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                service VARCHAR(50) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                gender VARCHAR(10) NOT NULL,
                date_of_birth DATE NOT NULL,
                description TEXT
            )
        `);

        console.log('✅ Table "workers" created (if it didn\'t exist)!');

        await pool.end();
        console.log('\n🎉 Database initialization complete!');
        console.log('📝 Next step: Run "npm run seed" to add sample data\n');
    }catch(error){
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

initDatabase();