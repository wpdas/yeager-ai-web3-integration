import "./App.css";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./routes";
import { store } from "./store";
import { GeneralErrorDialog } from "./ui/dialogs/general-error";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <GeneralErrorDialog />
        <AppRoutes />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
