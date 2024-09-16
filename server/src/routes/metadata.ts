import express from 'express';
import { createMetadata, createMetadataSchema } from '../controllers/metadata';
import { validateData } from '../middlewares/validation';

const metadataRoutes = express.Router();
metadataRoutes.post(
  '/create',
  validateData(createMetadataSchema),
  createMetadata,
);

export default metadataRoutes;
