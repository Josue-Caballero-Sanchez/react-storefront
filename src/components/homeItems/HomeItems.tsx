import styles from "./HomeItems.module.css";
import { useCartContext } from "../../contexts/CartContext";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import type { Item } from "../../contexts/CartContext";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { ThreeDot } from "react-loading-indicators";
import { TbFaceIdError } from "react-icons/tb";
import { VscError } from "react-icons/vsc";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { IoReloadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

type HomeItemProps = {
  products: any[];
  loading: boolean;
  errorMessage: string;
  reload(): void;
};

function HomeItems({ products, loading, errorMessage, reload }: HomeItemProps) {
  const cart = useCartContext();
  const favorites = useFavoritesContext();

  function handleAddItemButton(item: Item) {
    if (!cart.isItemInCart(item.id, item.name)) {
      cart.addItemToCart(item);
    } else {
      cart.removeItemFromCart(item);
    }
  }

  function handleFavoriteItemButton(item: Item) {
    if (!favorites.isItemFavorite(item.id, item.name)) {
      favorites.addFavoriteItem(item);
    } else {
      favorites.removeFavoriteItem(item);
    }
  }

  if (loading) {
    return (
      <div className={styles.message__container}>
        <ThreeDot
          variant="bounce"
          color="#000000"
          size="large"
          text=""
          textColor=""
        />
        <p>Loading...</p>
      </div>
    );
  }

  if (errorMessage !== "") {
    return (
      <div className={styles.message__container}>
        <TbFaceIdError className={styles.error__icon} />
        <p className={styles.error__message}>{errorMessage}</p>
        <button className={styles.retry__button} onClick={reload}>
          <IoReloadOutline /> Retry
        </button>
      </div>
    );
  }

  if (products.length === 0 || products === null) {
    return (
      <div className={styles.message__container}>
        <VscError className={styles.error__icon} />
        <p>No items found!</p>
        <button className={styles.retry__button} onClick={reload}>
          <IoReloadOutline /> Reload
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <Link
          key={product.id}
          className={styles.item}
          to={`product/${product.id}`}
        >
          <img src={product.images[0]} alt={`${product.title} thumbnail`} />
          <div className={styles.item__details}>
            <p className={styles.category__text}>
              {product.category.toUpperCase()}
            </p>
            <p className={styles.title__text}>{product.title}</p>
            <p className={styles.rating__text}>{product.rating}/5</p>
            <p className={styles.shipping__text}>
              {product.shippingInformation}
            </p>
            <div className={styles.price__container}>
              <p>${product.price}</p>
              {product.price !=
                (
                  product.price *
                  (product.discountPercentage / 100 + 1)
                ).toFixed(2) && (
                <>
                  <p className={styles.original__price}>
                    $
                    {(
                      product.price *
                      (product.discountPercentage / 100 + 1)
                    ).toFixed(2)}
                  </p>
                  <p className={styles.discount__text}>
                    -{product.discountPercentage.toFixed(2)}%
                  </p>
                </>
              )}
            </div>
            <div>
              <button
                className={
                  cart.isItemInCart(product.id, product.title)
                    ? styles.disabled__button
                    : ""
                }
                onClick={(e): void => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddItemButton({
                    id: product.id,
                    name: product.title,
                    imageURL: product.images[0],
                    category: product.category.toUpperCase(),
                    rating: product.rating + "/5",
                    shippingInfo: product.shippingInformation,
                    discountPrice: (
                      product.price *
                      (product.discountPercentage / 100 + 1)
                    ).toFixed(2),
                    discountPercentage:
                      "-" + product.discountPercentage.toFixed(2) + "%",
                    price: product.price,
                  });
                }}
              >
                {cart.isItemInCart(product.id, product.title) ? (
                  <span key="remove" className={styles.button__content}>
                    <MdOutlineRemoveShoppingCart />
                    Remove from Cart
                  </span>
                ) : (
                  <span key="add" className={styles.button__content}>
                    <IoCartOutline />
                    Add to Cart
                  </span>
                )}
              </button>
              <button
                className={styles.favorite__button}
                onClick={(e): void => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFavoriteItemButton({
                    id: product.id,
                    name: product.title,
                    imageURL: product.images[0],
                    category: product.category.toUpperCase(),
                    rating: product.rating + "/5",
                    shippingInfo: product.shippingInformation,
                    discountPrice: (
                      product.price *
                      (product.discountPercentage / 100 + 1)
                    ).toFixed(2),
                    discountPercentage:
                      "-" + product.discountPercentage.toFixed(2) + "%",
                    price: product.price,
                  });
                }}
              >
                {favorites.isItemFavorite(product.id, product.title) ? (
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
  );
}

export default HomeItems;
