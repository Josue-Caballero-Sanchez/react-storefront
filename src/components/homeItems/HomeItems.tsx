import styles from "./HomeItems.module.css";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";

const BASE_API_URL = import.meta.env.VITE_API_URL;

function HomeItems() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAllProducts(): Promise<void> {
      try {
        const response = await fetch(`${BASE_API_URL}/products`);

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return;
        }

        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }

    fetchAllProducts();
  }, []);

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.item}>
          <img src={product.images[0]} alt={`${product.title} thumbnail`} />
          <div className={styles.item__details}>
            <p className={styles.category__text}>
              {product.category.toUpperCase()}
            </p>
            <p>{product.title}</p>
            <p className={styles.rating__text}>{product.rating}/5</p>
            <p className={styles.shipping__text}>
              {product.shippingInformation}
            </p>
            <div className={styles.price__container}>
              <p>${product.price}</p>
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
