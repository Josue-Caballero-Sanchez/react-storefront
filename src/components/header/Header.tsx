import styles from "./Header.module.css";
import { useState } from "react";
import { CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useCartContext } from "../../contexts/CartContext";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { IoIosSearch } from "react-icons/io";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const cart = useCartContext();
  const favorites = useFavoritesContext();

  return (
    <header className={styles.header}>
      {isNavActive && (
        <div
          onClick={(): void => setIsNavActive(false)}
          className={styles.overlay}
        ></div>
      )}
      <div className={styles.header__container}>
        <a className={styles.logo} href="#">
          Shopp
        </a>
        <div className={styles.search__container}>
          <input id="search" type="search" placeholder="Search products..." />
          <div className={styles.search__icon__container}>
            <IoIosSearch className={styles.search__icon} />
          </div>
        </div>
        <nav className={isNavActive ? styles.nav__active : ""}>
          <a
            className={styles.nav__item}
            href="#filters"
            onClick={(): void => setIsNavActive(false)}
          >
            <CiShoppingTag />
            <p>Shop</p>
          </a>
          <a
            className={styles.nav__item}
            href="#"
            onClick={(): void => setIsNavActive(false)}
          >
            <CiHeart />
            <p>Favorites</p>
            {favorites.favoriteItems.length > 0 && (
              <div className={styles.item__count__container}>
                <p className={styles.favorites__count}>
                  {favorites.favoriteItems.length}
                </p>
              </div>
            )}
          </a>
          <a
            className={styles.nav__item}
            href="#"
            onClick={(): void => setIsNavActive(false)}
          >
            <IoCartOutline />
            <p>Cart</p>
            {cart.cartItems.length > 0 && (
              <div className={styles.item__count__container}>
                <p className={styles.item__count}>{cart.cartItems.length}</p>
              </div>
            )}
          </a>
        </nav>

        <button
          className={styles.header__toggle__button}
          onClick={(): void => setIsNavActive(!isNavActive)}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
