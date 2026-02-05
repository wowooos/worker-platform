import express from 'express';
import cors from 'cors';
import workerRoutes from './routes/workersRoutes.js';
import serviceRoutes from './routes/servicesRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', workerRoutes, serviceRoutes);

export default app;