import express from 'express';
import { healthCheck } from '../controllers/health-check';

const healthCheckRoutes = express.Router();
healthCheckRoutes.get('/', healthCheck);

export default healthCheckRoutes;
