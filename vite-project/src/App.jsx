import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import WorkerCard from './components/WorkerCard';
import AddWorkerForm from './components/AddWorkerForm';

// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedService, setSelectedService] = useState('all');  // what the user chooses
    const [services, setServices] = useState([]);   // what choices are available = populated by API call to backend
    
    const fetchWorkers = async () => {
        try {
            console.log(loading);
            /*
                setLoading(true) e setError(null) meio que servem para resetar os valores de loading e de error, mas eu só vou entrar nessa função UMA vez (a primeira vez que a página for renderizada), então nem faz sentido ter isso.
             */
            setLoading(true);    // reset loading to true if changed to false
            // setError(null);     // clear previous errors
            const response = await axios.get('http://localhost:5000/workers');
            setWorkers(response.data);
            // console.log(response.data); // .data => lista de objetos/ lista de workers
            // console.log(response);
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
            console.log(result.data);
        }catch(error){
            console.error('Error fetching services: ', error);
        }
    }

    const addWorker = async (newWorker) => {
        try{
            const response = await axios.post('http://localhost:5000/workers',newWorker);
            console.log(response.data);
            // refresh the list:
            fetchWorkers();
        } catch(error) {    
            console.error(error);
        }
    };  
    
    useEffect(() => {   // fetchWorkers()
        fetchWorkers();
    }, []);

    useEffect(() => {   // fetchServices()
        fetchServices();
    }, []);
    
    // workers filtered by service
    const filteredWorkers = selectedService === 'all' ? workers : workers.filter((w) => w.service===selectedService);

    return (
        <div className='App'>
            <h1>Worker Platform</h1>

            <AddWorkerForm onAddWorker={addWorker} services={services} />

            {/* <div>
                <button 
                    onClick={() => setSelectedService('all')}
                    >
                    All
                </button>
                {services.map(service => (
                    <button key={service} 
                    onClick={() => setSelectedService(service)}
                    >
                        {service}
                    </button>
                ))}
            </div> */}
            
            <div>
                <h3>Filter by Service:</h3>
                <select name="filterService" id="filterService" onChange={(event) => setSelectedService(event.target.value)}>

                    <option value="all">Select All</option>
                    {services.map((service) => (
                        <option value={service}>{service}</option>
                    ))}
                    
                </select>
            </div>

            <div>
                {loading && (
                    <p>Loading workers...</p>
                )}   {/**If [loading] is true, show [loading] */}
                {error && (
                    <p style={{color: 'red'}}>{error}</p>
                )}   {/**If [error] exists, show [error] */}
                {!loading && !error && workers.length === 0 && (
                    <p>No workers found.</p>
                )}  {/**If [loading] is false and [error] is false and there's no [workers] registered */}
                {!loading && !error && (
                    <div>
                        {filteredWorkers.map((worker) => (
                            <WorkerCard key={worker.id}
                                name={worker.first_name + ' ' + worker.last_name}
                                service={worker.service}
                                phone={worker.phone}
                                description={worker.description}
                                birthday={worker.date_of_birth}
                            />
                        ))}
                    </div>
                )}  {/**If [loading] is false and [error] is false, show workers */}
            </div>


        </div>
    );
}

export default App;