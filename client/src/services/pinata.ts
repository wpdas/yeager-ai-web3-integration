import { PINATA_GATEWAY_URL, PINATA_JWT } from "@/constants";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY_URL,
});

export const uploadImageToIPFS = async (imageFile: File) =>
  pinata.upload.file(imageFile);
