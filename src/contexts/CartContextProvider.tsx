import { CartContext } from "./CartContext";
import React, { useState } from "react";
import type { Item, Cart } from "./CartContext";

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<Item[]>([]);

  function addItemToCart(item: Item) {
    setCartItems((prev) => [...prev, item]);
  }

  function removeItemFromCart(item: Item) {
    setCartItems((prev) =>
      prev.filter(
        (cartItem) => cartItem.id !== item.id && cartItem.name !== item.name,
      ),
    );
  }

  function isItemInCart(itemId: number, itemName: string) {
    return cartItems.some(
      (cartItem) => cartItem.id === itemId && cartItem.name === itemName,
    );
  }

  const cart: Cart = {
    cartItems: cartItems,
    addItemToCart: addItemToCart,
    removeItemFromCart: removeItemFromCart,
    isItemInCart: isItemInCart,
  };
  return <CartContext value={cart}>{children}</CartContext>;
};
