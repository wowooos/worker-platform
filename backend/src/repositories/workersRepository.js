import db from '../config/db.js'

export const findAll = async () => {
    // query para o BD
    const workers = await db.query('SELECT * FROM worker');
    // console.log(workers);
    // console.log(workers.rows);
    return workers.rows;
};

export const create = async (first_name, last_name, service, phone, gender, date_of_birth, description) => {
    const workerPosted = await db.query(`INSERT INTO worker (first_name, last_name, service, phone, gender, date_of_birth, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [first_name, last_name, service, phone, gender, date_of_birth, description]);

    return workerPosted.rows;
};