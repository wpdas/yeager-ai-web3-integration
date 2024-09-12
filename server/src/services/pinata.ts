import { PinataSDK } from 'pinata-web3';
import { PINATA_GATEWAY_URL, PINATA_JWT } from '../constants';

export const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY_URL,
});
