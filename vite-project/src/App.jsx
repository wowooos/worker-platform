import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import WorkerCard from './components/WorkerCard';
import AddWorkerForm from './components/AddWorkerForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App(){
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedService, setSelectedService] = useState('all');
    const [services, setServices] = useState([]);
    
    const fetchWorkers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/workers');
            setWorkers(response.data);
        } catch (error){
            console.error('Error fetching workers: ', error);
            setError('Failed to load workers. Refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    const fetchServices = async () => {
        try{
            const result = await axios.get('http://localhost:5000/services');
            setServices(result.data.map((s) => s.service));
        }catch(error){
            console.error('Error fetching services: ', error);
        }
    }

    const addWorker = async (newWorker) => {
        try{
            const response = await axios.post('http://localhost:5000/workers',newWorker);
            console.log(response.data);
            fetchWorkers();
        } catch(error) {    
            console.error(error);
        }
    };  
    
    useEffect(() => {
        fetchWorkers();
    }, []);

    useEffect(() => {
        fetchServices();
    }, []);
    
    const filteredWorkers = selectedService === 'all' ? workers : workers.filter((w) => w.service===selectedService);

    return (
        <div className='container-fluid bg-light min-vh-100 py-4'>
            {/* Header */}
            <div className='text-center mb-4'>
                <h1 className='display-4 fw-bold text-primary'>Worker Platform</h1>
                <p className='lead text-muted'>Find and hire the best professionals</p>
            </div>

            <div className='container'>
                {/* Add Worker Form */}
                <div className='mb-5'>
                    <AddWorkerForm onAddWorker={addWorker} services={services} />
                </div>

                {/* Filter Section */}
                <div className='card shadow-sm mb-4'>
                    <div className='card-body'>
                        <div className='row align-items-center'>
                            <div className='col-md-3'>
                                <label htmlFor="filterService" className='form-label fw-bold'>
                                    <i className='bi bi-funnel'></i> Filter by Service:
                                </label>
                            </div>
                            <div className='col-md-9'>
                                <select 
                                    name="filterService" 
                                    id="filterService" 
                                    className='form-select form-select-lg'
                                    onChange={(event) => setSelectedService(event.target.value)}
                                    value={selectedService}
                                >
                                    <option value="all">All Services</option>
                                    {services.map((service) => (
                                        <option key={service} value={service}>{service}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Workers Display Section */}
                <div>
                    {loading && (
                        <div className='text-center py-5'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </div>
                            <p className='mt-3 text-muted'>Loading workers...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className='alert alert-danger' role='alert'>
                            <i className='bi bi-exclamation-triangle-fill'></i> {error}
                        </div>
                    )}
                    
                    {!loading && !error && filteredWorkers.length === 0 && (
                        <div className='alert alert-info text-center' role='alert'>
                            <i className='bi bi-info-circle-fill'></i> No workers found for this service.
                        </div>
                    )}
                    
                    {!loading && !error && filteredWorkers.length > 0 && (
                        <>
                            <h3 className='mb-3 text-secondary'>
                                Available Workers 
                                <span className='badge bg-primary ms-2'>{filteredWorkers.length}</span>
                            </h3>
                            <div className='row'>
                                {filteredWorkers.map((worker) => (
                                    <div key={worker.id} className='col-md-6 col-lg-4 mb-4'>
                                        <WorkerCard 
                                            name={worker.first_name + ' ' + worker.last_name}
                                            service={worker.service}
                                            phone={worker.phone}
                                            description={worker.description}
                                            birthday={worker.date_of_birth}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;