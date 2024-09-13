import "./App.css";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./routes";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
