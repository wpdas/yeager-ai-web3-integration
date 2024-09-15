import { API_URL } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: API_URL,
});

interface CreateNFTmetadataPayload {
  name: string;
  description: string;
  imageCID: string;
}

interface CreateNFTmetadataResponse {
  tokenCID: string;
}

export const createNFTmetadata = (payload: CreateNFTmetadataPayload) =>
  api.post<CreateNFTmetadataResponse>("/api/metadata/create", payload);

export const healthCheck = () =>
  api.get<CreateNFTmetadataResponse>("/api/health-check");
