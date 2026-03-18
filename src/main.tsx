import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home/Home";
import { CartContextProvider } from "./contexts/CartContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartContextProvider>
      <Home />
    </CartContextProvider>
  </StrictMode>,
);
