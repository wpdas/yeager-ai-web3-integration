import { RootModel } from "@/store/models";
import { createModel } from "@rematch/core";

interface ErrorState {
  isOpen: boolean;
  message: string;
}

/**
 * Error State
 */
const initialState: ErrorState = {
  isOpen: false,
  message: "",
};

export const error = createModel<RootModel>()({
  state: initialState,

  reducers: {
    setError(state: ErrorState, { message }: Omit<ErrorState, "isOpen">) {
      state.message = message;
      state.isOpen = true;
    },

    clear() {
      return initialState;
    },
  },
});
