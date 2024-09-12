import { RootModel } from "@/store/models";
import { createModel } from "@rematch/core";

interface WalletState {
  account: string;
}

/**
 * Wallet State
 */
const initialState: WalletState = {
  account: "",
};

export const wallet = createModel<RootModel>()({
  state: initialState,

  reducers: {
    setAccount(state: WalletState, { account }: WalletState) {
      state.account = account;
    },

    disconnect() {
      return initialState;
    },
  },
});
