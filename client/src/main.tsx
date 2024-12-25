import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { UserProvider } from "./providers/user-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
