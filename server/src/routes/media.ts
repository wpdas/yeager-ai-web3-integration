import express from 'express';
import { getMedia } from '../controllers/media';

const mediaRoutes = express.Router();
mediaRoutes.get('/get_media', getMedia);

export default mediaRoutes;
