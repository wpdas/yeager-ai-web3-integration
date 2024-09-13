import { Models } from "@rematch/core";
import { globalDialog } from "./global-dialog";
import { mintStatus } from "./mint-status";
import { wallet } from "./wallet";

export interface RootModel extends Models<RootModel> {
  wallet: typeof wallet;
  globalDialog: typeof globalDialog;
  mintStatus: typeof mintStatus;
}

export const models: RootModel = { wallet, globalDialog, mintStatus };
