import styles from "./HomeItems.module.css";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";

function HomeItems() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    async function FetchAllItems() {
      try {
        const response = await fetch("http://localhost:5000/");
        const fetchedData = await response.json();
        if (!response.ok) {
          throw new Error(`Error fetching items: ${fetchedData.message}`);
        }
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
    }

    FetchAllItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
          alt="item-picture"
        />
        <div className={styles.item__details}>
          <p className={styles.category__text}>BEAUTY</p>
          <p>Essence Mascara Lash Princess</p>
          <p className={styles.rating__text}>2.56/5 </p>
          <p className={styles.shipping__text}>Ships in 3-5 business days</p>
          <div className={styles.price__container}>
            <p>$9.99</p>
            <p className={styles.original__price}>
              ${(9.99 * 0.75).toFixed(2)}
            </p>
            <p className={styles.discount__text}>-25%</p>
          </div>
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

      <div className={styles.item}>
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
          alt="item-picture"
        />
        <div className={styles.item__details}>
          <p className={styles.category__text}>BEAUTY</p>
          <p>Essence Mascara Lash Princess</p>
          <p className={styles.rating__text}>2.56/5 </p>
          <p className={styles.shipping__text}>Ships in 3-5 business days</p>
          <div className={styles.price__container}>
            <p>$9.99</p>
            <p className={styles.original__price}>
              ${(9.99 * 0.75).toFixed(2)}
            </p>
            <p className={styles.discount__text}>-25%</p>
          </div>
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
      <div className={styles.item}>
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
          alt="item-picture"
        />
        <div className={styles.item__details}>
          <p className={styles.category__text}>BEAUTY</p>
          <p>Essence Mascara Lash Princess</p>
          <p className={styles.rating__text}>2.56/5 </p>
          <p className={styles.shipping__text}>Ships in 3-5 business days</p>
          <div className={styles.price__container}>
            <p>$9.99</p>
            <p className={styles.original__price}>
              ${(9.99 * 0.75).toFixed(2)}
            </p>
            <p className={styles.discount__text}>-25%</p>
          </div>
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

      <div className={styles.item}>
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
          alt="item-picture"
        />
        <div className={styles.item__details}>
          <p className={styles.category__text}>BEAUTY</p>
          <p>Essence Mascara Lash Princess</p>
          <p className={styles.rating__text}>2.56/5 </p>
          <p className={styles.shipping__text}>Ships in 3-5 business days</p>
          <div className={styles.price__container}>
            <p>$9.99</p>
            <p className={styles.original__price}>
              ${(9.99 * 0.75).toFixed(2)}
            </p>
            <p className={styles.discount__text}>-25%</p>
          </div>
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

      <div className={styles.item}>
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
          alt="item-picture"
        />
        <div className={styles.item__details}>
          <p className={styles.category__text}>BEAUTY</p>
          <p>Essence Mascara Lash Princess</p>
          <p className={styles.rating__text}>2.56/5 </p>
          <p className={styles.shipping__text}>Ships in 3-5 business days</p>
          <div className={styles.price__container}>
            <p>$9.99</p>
            <p className={styles.original__price}>
              ${(9.99 * 0.75).toFixed(2)}
            </p>
            <p className={styles.discount__text}>-25%</p>
          </div>
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
  );
}

export default HomeItems;
