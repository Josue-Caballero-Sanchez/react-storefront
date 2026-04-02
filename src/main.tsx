import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartContextProvider } from "./contexts/CartContextProvider";
import { FavoritesContextProvider } from "./contexts/FavoritesContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import OrderedPage from "./pages/orderedPage/OrderedPage";
import Product from "./pages/product/Product";
import Favorites from "./pages/favorites/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: (
      <div style={{ color: "black", fontSize: "4rem", padding: "2rem" }}>
        Error 404 Not Found
      </div>
    ),
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/checkout",
    element: <OrderedPage />,
  },
  {
    path: "/product/:productId",
    element: <Product />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartContextProvider>
      <FavoritesContextProvider>
        <RouterProvider router={router} />
      </FavoritesContextProvider>
    </CartContextProvider>
  </StrictMode>,
);
