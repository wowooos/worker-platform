import * as workersRepository from '../repositories/workersRepository.js'

export const getAllWorkers = async () => {
    const workers = await workersRepository.findAll();
    // console.log(`SERVICE: ${workers}`);
    return workers;
};

export const createWorker = async (first_name, last_name, service, phone, gender, date_of_birth, description) => {
    // implement business rules

    const workerPosted = await workersRepository.create(first_name, last_name, service, phone, gender, date_of_birth, description);
    return workerPosted;
};