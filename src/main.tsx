import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home/Home";
import { CartContextProvider } from "./contexts/CartContextProvider";
import { FavoritesContextProvider } from "./contexts/FavoritesContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartContextProvider>
      <FavoritesContextProvider>
        <Home />
      </FavoritesContextProvider>
    </CartContextProvider>
  </StrictMode>,
);
