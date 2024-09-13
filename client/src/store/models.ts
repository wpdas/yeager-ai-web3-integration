import { Models } from "@rematch/core";
import { error } from "./error";
import { mintStatus } from "./mint-status";
import { wallet } from "./wallet";

export interface RootModel extends Models<RootModel> {
  wallet: typeof wallet;
  error: typeof error;
  mintStatus: typeof mintStatus;
}

export const models: RootModel = { wallet, error, mintStatus };
