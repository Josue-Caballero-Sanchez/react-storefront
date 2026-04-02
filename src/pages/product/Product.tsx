import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { TbFaceIdError } from "react-icons/tb";
import { IoReloadOutline } from "react-icons/io5";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { useCartContext } from "../../contexts/CartContext";
import type { Item } from "../../contexts/CartContext";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";

const BASE_API_URL = import.meta.env.VITE_API_URL;

function Product() {
  const params = useParams();
  const cart = useCartContext();
  const favorites = useFavoritesContext();
  const [productData, setProductData] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function getItemDetails() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${BASE_API_URL}/products/product/${params.productId}`,
      );

      if (!response.ok) {
        setLoading(false);
        setErrorMessage("Failed to fetch products. Please try again later.");
        return;
      }

      const data = await response.json();
      setLoading(false);
      setProductData(data);
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        "An error occurred while fetching product. Please try again later.",
      );
    }
  }

  function reload() {
    setErrorMessage("");
    getItemDetails();
  }

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

  useEffect(() => {
    getItemDetails();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
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
      </>
    );
  }

  if (errorMessage !== "") {
    return (
      <>
        <Header />
        <div className={styles.message__container}>
          <TbFaceIdError className={styles.error__icon} />
          <p className={styles.error__message}>{errorMessage}</p>
          <button className={styles.retry__button} onClick={reload}>
            <IoReloadOutline /> Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className={styles.main__container}>
          <div className={styles.image__container}>
            <img src={productData.images[0]} alt={productData.title} />
          </div>
          <div className={styles.details__container}>
            <h1>{productData.title}</h1>
            <p className={styles.category__text}>
              {productData.category.toUpperCase()}
            </p>
            <p className={styles.gray__text}>Rating: {productData.rating}/5</p>
            <p className={styles.gray__text}>
              {productData.shippingInformation}
            </p>
            <p className={styles.gray__text}>
              {productData.warrantyInformation}
            </p>
            <p className={styles.gray__text}>
              Return Policy: {productData.returnPolicy}
            </p>
            <p
              className={
                productData.availabilityStatus === "In Stock"
                  ? styles.green__text
                  : styles.red__text
              }
            >
              {productData.availabilityStatus}
            </p>
            <div className={styles.price__container}>
              <p>${productData.price.toFixed(2)}</p>
              {productData.price !=
                (
                  productData.price *
                  (productData.discountPercentage / 100 + 1)
                ).toFixed(2) && (
                <>
                  <p className={styles.original__price}>
                    $
                    {(
                      productData.price *
                      (productData.discountPercentage / 100 + 1)
                    ).toFixed(2)}
                  </p>
                  <p className={styles.discount__text}>
                    -{productData.discountPercentage.toFixed(2)}%
                  </p>
                </>
              )}
            </div>
            <p className={styles.description__text}>
              {productData.description}
            </p>
            <div className={styles.button__container}>
              <button
                className={
                  cart.isItemInCart(productData.id, productData.title)
                    ? styles.disabled__button
                    : ""
                }
                onClick={(): void =>
                  handleAddItemButton({
                    id: productData.id,
                    name: productData.title,
                    imageURL: productData.images[0],
                    category: productData.category.toUpperCase(),
                    rating: productData.rating + "/5",
                    shippingInfo: productData.shippingInformation,
                    discountPrice: (
                      productData.price *
                      (productData.discountPercentage / 100 + 1)
                    ).toFixed(2),
                    discountPercentage:
                      "-" + productData.discountPercentage.toFixed(2) + "%",
                    price: productData.price,
                  })
                }
              >
                {cart.isItemInCart(productData.id, productData.title) ? (
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
                onClick={(): void =>
                  handleFavoriteItemButton({
                    id: productData.id,
                    name: productData.title,
                    imageURL: productData.images[0],
                    category: productData.category.toUpperCase(),
                    rating: productData.rating + "/5",
                    shippingInfo: productData.shippingInformation,
                    discountPrice: (
                      productData.price *
                      (productData.discountPercentage / 100 + 1)
                    ).toFixed(2),
                    discountPercentage:
                      "-" + productData.discountPercentage.toFixed(2) + "%",
                    price: productData.price,
                  })
                }
              >
                {favorites.isItemFavorite(productData.id, productData.title) ? (
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
        </div>
        {productData.reviews.length > 0 && (
          <p className={styles.review__title}>Customer Reviews</p>
        )}
        {productData.reviews.map((review: any, index: number) => (
          <div key={index} className={styles.review__container}>
            <div className={styles.review__title__container}>
              <IoPersonCircle size={22} />
              <p>{review.reviewerName}</p>
            </div>
            <p className={styles.small__text}>Rating: {review.rating}/5</p>
            <p className={styles.small__text}>
              Review Date: {new Date(review.date).toLocaleDateString()}
            </p>
            <p>{review.comment}</p>
          </div>
        ))}
      </main>
    </>
  );
}

export default Product;
