import { z } from "zod";
import { mintNftSchema } from "./schemas";

export type MintNftInputs = z.infer<typeof mintNftSchema>;
