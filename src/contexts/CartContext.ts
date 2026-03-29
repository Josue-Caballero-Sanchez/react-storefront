import { createContext, useContext } from "react";

export type Item = {
  id: number;
  name: string;
  imageURL: string;
  category: string;
  rating: string;
  shippingInfo: string;
  discountPrice: string;
  discountPercentage: string;
  price: number;
};

export type Cart = {
  cartItems: Item[];
  addItemToCart(item: Item): void;
  removeItemFromCart(item: Item): void;
  removeAllItemsFromCart(): void;
  isItemInCart(itemId: number, itemName: string): boolean;
};

export const CartContext = createContext<undefined | Cart>(undefined);

export function useCartContext() {
  const cart = useContext(CartContext);

  if (cart === undefined) {
    throw new Error("useCartContext must be used with a cartContext");
  }

  return cart;
}
