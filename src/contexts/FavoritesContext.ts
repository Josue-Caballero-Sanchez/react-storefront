import { createContext, useContext } from "react";
import type { Item } from "./CartContext";

export type Favorites = {
  favoriteItems: Item[];
  addFavoriteItem(item: Item): void;
  removeFavoriteItem(item: Item): void;
  isItemFavorite(itemId: number, itemName: string): boolean;
}

export const FavoritesContext = createContext<undefined | Favorites>(undefined);

export function useFavoritesContext() {
  const favorites = useContext(FavoritesContext);

  if (favorites === undefined) {
    throw new Error("useFavoritesContext must be used with a FavoritesContext");
  }

  return favorites;
}