import * as servicesService from '../services/servicesService.js';

export const getAllServices = async (req, res) => {
    try{
        const services = await servicesService.getAllServices();
        res.json(services);
    }catch(error){
        console.error(error);
        res.status(500).json({error:error.message});
    }
};