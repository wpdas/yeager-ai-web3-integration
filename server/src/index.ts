import cors from 'cors';
import express from 'express';
import { initRoutes } from './routes';
import { PORT } from './constants';

const serverCors = cors({ origin: true });
const server = express();

server.use(serverCors);
server.use(express.json());
initRoutes(server);

server.on('error', () => {
  process.exit(1);
});

server.on('close', () => {
  process.exit(1);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
