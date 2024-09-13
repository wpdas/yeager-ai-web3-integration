import { RootModel } from "@/store/models";
import { createModel } from "@rematch/core";

interface MintStatusState {
  imageCID: string;
  tokenURI: string;
}

/**
 * Mint Status State
 */
const initialState: MintStatusState = {
  imageCID: "",
  tokenURI: "",
};

export const mintStatus = createModel<RootModel>()({
  state: initialState,

  reducers: {
    setImageCID(state: MintStatusState, imageCID: string) {
      state.imageCID = imageCID;
    },

    setTokenURI(state: MintStatusState, tokenURI: string) {
      state.tokenURI = tokenURI;
    },

    clear() {
      return initialState;
    },
  },
});
