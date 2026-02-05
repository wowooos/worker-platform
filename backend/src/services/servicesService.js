import * as servicesRepository from '../repositories/servicesRepository.js';

// implement business rules

export const getAllServices = async () => {
    return await servicesRepository.findAll();
};