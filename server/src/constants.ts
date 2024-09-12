import dotenv from 'dotenv';

// Init env vars
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const PINATA_JWT = process.env.PINATA_JWT;
export const PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;
export const PINATA_GATEWAY_FORMATTED_URL = `https://${PINATA_GATEWAY_URL}/ipfs/`;
