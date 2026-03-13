import styles from "./HomeItems.module.css";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { ThreeDot } from "react-loading-indicators";
import { TbFaceIdError } from "react-icons/tb";
import { IoReload } from "react-icons/io5";
import { VscError } from "react-icons/vsc";

type HomeItemProps = {
  products: any[];
  loading: boolean;
  errorMessage: string;
  reload(): void;
};

function HomeItems({ products, loading, errorMessage, reload }: HomeItemProps) {
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
          <IoReload /> Retry
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
          <IoReload /> Reload
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.item}>
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
              <button>
                <IoCartOutline />
                Add to Cart
              </button>
              <button className={styles.favorite__button}>
                <CiHeart />
                Favorite
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeItems;
