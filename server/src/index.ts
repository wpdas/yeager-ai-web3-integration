import cors from 'cors';
import express from 'express';
import { initRoutes } from './routes';
import { NODE_ENV, PORT } from './constants';

const serverCors = cors({
  origin:
    NODE_ENV === 'development'
      ? '*'
      : 'https://yeager-ai-web3-integration.vercel.app',
});
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
