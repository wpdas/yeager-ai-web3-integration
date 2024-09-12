import { Express } from 'express';
import healthCheckRoutes from './health-check';
import metadataRoutes from './metadata';

export const initRoutes = (server: Express) => {
  server.use('/api/health-check', healthCheckRoutes);
  server.use('/api/metadata', metadataRoutes);
};
