require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');           // utility to help with file paths.
const db = require('./db');
const { type } = require('os');
//--------------------------------------------------
const app = express();
const port = process.env.PORT || 8000;  // move to the bottom later 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:5000/workers`);
});
//--------------------------------------------------
// middleware
app.use(cors());                     // unlock at day 9
app.use(express.json());            // tells Express: "parse incoming JSON data and put it in req.body"
//--------------------------------------------------
// ----------- WORKERS ---------------

// GET all workers
app.get('/workers', async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM worker');
        res.json(result.rows);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Database error'});
    }
});

// GET by service
app.get('/workers/service/:service', async(req, res) => {
    
    try{
        const { service } = req.params;
        const result = await db.query(`SELECT * FROM worker WHERE service=$1`,
            [service]
        );

        if(result.rows.length > 0){
            console.log(`[ > ] Requested service: ${service}`);
            res.json(result.rows);
        }else{
            console.log(`${service.toUpperCase()} does not exist.`);
            res.send(`${service.toUpperCase()} does not exist.`);
        }


    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Database error'});
    }
});

// GET unique services
app.get('/services', async (req, res) => {
    try{
        const result = await db.query('SELECT DISTINCT service FROM worker');
        res.json(result.rows);
    }catch (error){
        console.log(error);
        res.status(500).json({error: 'Database error'});
    }
});

// POST
app.post('/workers', async (req, res) => {

    const result_test = req.body;
    console.log(result_test);

    try{
        const { first_name, last_name, service, phone, gender, date_of_birth, description } = req.body;
        const result = await db.query(
            `INSERT INTO worker (first_name, last_name, service, phone, gender, date_of_birth, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [first_name, last_name, service, phone, gender, date_of_birth, description]
        );

        res.json(result.rows);
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Error adding worker'});
    }
});


//--------------------------------------------------

// GET by id
// app.get('/workers/:id', async (req, res) => {
//     const id_sent = parseInt(req.params.id);
    
//     try{
//         const result = await db.query(`SELECT * FROM worker WHERE id = $1`,
//             [id_sent]
//         );
        
//         if(result.rows.length > 0){
//             res.json(result.rows);
//             console.log(`[ > ] Requested id: ${id_sent}`);
//             // console.log(req.params);
//         }else{
//             res.send('ID not found.');
//             console.log('[ > ] ID not found.');
//         }

//     }catch (error){
//         console.error(error);
//         res.status(500).json({error: 'Database error'});        
//     }
// });