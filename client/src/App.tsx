import "./App.css";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { useApiHealthCheck } from "./hooks";
import { AppRoutes } from "./routes";
import { store } from "./store";

function App() {
  useApiHealthCheck();

  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
