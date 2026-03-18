import { useState } from "react";
import type { Item } from "./CartContext";
import { FavoritesContext, type Favorites } from "./FavoritesContext";

export const FavoritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteItems, setFavoriteItems] = useState<Item[]>([]);

  function addFavoriteItem(item: Item) {
    setFavoriteItems((prev) => [...prev, item]);
  }

  function removeFavoriteItem(item: Item) {
    setFavoriteItems((prev) =>
      prev.filter(
        (favoriteItem) =>
          favoriteItem.id !== item.id && favoriteItem.name !== item.name,
      ),
    );
  }

  function isItemFavorite(itemId: number, itemName: string) {
    return favoriteItems.some(
      (favoriteItem) =>
        favoriteItem.id === itemId && favoriteItem.name === itemName,
    );
  }

  const favorites: Favorites = {
    favoriteItems,
    addFavoriteItem,
    removeFavoriteItem,
    isItemFavorite,
  };
  return <FavoritesContext value={favorites}>{children}</FavoritesContext>;
};
