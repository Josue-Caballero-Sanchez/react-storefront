import Header from "../../components/header/Header";
import styles from "./Favorites.module.css";
import { FaHeartCircleXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import type { Item } from "../../contexts/CartContext";

function Favorites() {
  const favorites = useFavoritesContext();
  const navigate = useNavigate();

  function handleContinueShopping(): void {
    navigate("/");
    setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleFavoriteItemButton(item: Item) {
    if (!favorites.isItemFavorite(item.id, item.name)) {
      favorites.addFavoriteItem(item);
    } else {
      favorites.removeFavoriteItem(item);
    }
  }

  if (favorites.favoriteItems.length <= 0) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <p className={styles.heading__text}>
            Favorites ({favorites.favoriteItems.length})
          </p>
          <div className={styles.center__container}>
            <FaHeartCircleXmark className={styles.icon} />
            <p>Your Favorites are Empty</p>
            <button
              className={styles.return__button}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <p className={styles.heading__text}>
          Favorites ({favorites.favoriteItems.length})
        </p>
        <div className={styles.items__container}>
          {favorites.favoriteItems.map((product) => (
            <Link
              key={product.id}
              className={styles.item}
              to={`/product/${product.id}`}
            >
              <img src={product.imageURL} alt={`${product.name} thumbnail`} />
              <div className={styles.item__details}>
                <p className={styles.category__text}>{product.category}</p>
                <p className={styles.title__text}>{product.name}</p>
                <p className={styles.rating__text}>{product.rating}/5</p>
                <p className={styles.shipping__text}>{product.shippingInfo}</p>
                <div className={styles.price__container}>
                  <p>${product.price}</p>
                  {product.price != parseInt(product.discountPrice) && (
                    <>
                      <p className={styles.original__price}>
                        ${product.discountPrice}
                      </p>
                      <p className={styles.discount__text}>
                        {product.discountPercentage}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <button
                    className={styles.favorite__button}
                    onClick={(e): void => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFavoriteItemButton({
                        id: product.id,
                        name: product.name,
                        imageURL: product.imageURL,
                        category: product.category.toUpperCase(),
                        rating: product.rating + "/5",
                        shippingInfo: product.shippingInfo,
                        discountPrice: product.discountPrice,
                        discountPercentage: product.discountPercentage,
                        price: product.price,
                      });
                    }}
                  >
                    {favorites.isItemFavorite(product.id, product.name) ? (
                      <span key="remove" className={styles.button__content}>
                        <IoHeartDislikeOutline />
                        Unfavorite
                      </span>
                    ) : (
                      <span key="add" className={styles.button__content}>
                        <CiHeart />
                        Favorite
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.buttons__container}>
          <button onClick={favorites.removeAllFavoriteItems}>
            Clear Favorites
          </button>
        </div>
      </main>
    </>
  );
}

export default Favorites;
