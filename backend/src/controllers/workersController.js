import * as workersService from '../services/workersService.js';

export const getAllWorkers = async (req, res) => {
    try{
        const workers = await workersService.getAllWorkers();
        res.json(workers);
    }catch(error){
        console.error(error);
        res.status(500).json({error:error.message});
    }
};

export const createWorker = async (req, res) => {
    try{
        const { first_name, last_name, service, phone, gender, date_of_birth, description } = req.body;
        const workerPosted = await workersService.createWorker(first_name, last_name, service, phone, gender, date_of_birth, description);
        res.json(workerPosted);
    }catch(error){
        console.error(error);
        res.status(500).json({error:error.message});
    }
};