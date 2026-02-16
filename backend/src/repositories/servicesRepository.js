import db from '../config/db.js';

export const findAll = async () => {
    return (await db.query('SELECT DISTINCT service FROM worker')).rows;
};