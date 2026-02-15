/**
 * API calls to backend.
 */

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';

export const fetchWorkers = async () => {
    return await axios.get(apiUrl + 'workers'); 
};