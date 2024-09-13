import { RootModel } from "@/store/models";
import { createModel } from "@rematch/core";

interface GlobalDialogState {
  isOpen: boolean;
  title?: string;
  message: string;
  type: "normal" | "error";
  // If defined, takes the user to the "goTo value" page
  goTo?: string;
}

/**
 * Error State
 */
const initialState: GlobalDialogState = {
  isOpen: false,
  title: "",
  message: "",
  type: "normal",
  goTo: "",
};

export const globalDialog = createModel<RootModel>()({
  state: initialState,

  reducers: {
    setError(
      state: GlobalDialogState,
      { message, title, goTo }: Omit<GlobalDialogState, "isOpen" | "type">,
    ) {
      state.message = message;
      state.isOpen = true;
      state.type = "error";
      state.title = title || "Something went wrong!";
      state.goTo = goTo;
    },

    setMessage(
      state: GlobalDialogState,
      { message, title, goTo }: Omit<GlobalDialogState, "isOpen" | "type">,
    ) {
      state.message = message;
      state.isOpen = true;
      state.type = "normal";
      state.title = title || "All right!";
      state.goTo = goTo;
    },

    clear() {
      return initialState;
    },
  },
});
