import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useCartContext } from "../../contexts/CartContext";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const cart = useCartContext();

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
        <input id="search" type="search" placeholder="Search products..." />
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
          <div className={styles.bar}></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
