import styles from "./Header.module.css";
import { useState } from "react";
import { CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <a className={styles.logo} href="#">
          Shopp
        </a>
        <input type="search" placeholder="Search products..." />
        <nav className={isNavActive ? styles.nav__active : ""}>
          <a
            className={styles.nav__item}
            href="#items"
            onClick={() => setIsNavActive(false)}
          >
            <CiShoppingTag />
            <p>Shop</p>
          </a>
          <a
            className={styles.nav__item}
            href="#"
            onClick={() => setIsNavActive(false)}
          >
            <CiHeart />
            <p>Favorites</p>
          </a>
          <a
            className={styles.nav__item}
            href="#"
            onClick={() => setIsNavActive(false)}
          >
            <IoCartOutline />
            <p>Cart</p>
          </a>
        </nav>

        <a
          href="#"
          className={styles.header__toggle__button}
          onClick={() => setIsNavActive(!isNavActive)}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </a>
      </div>
    </header>
  );
}

export default Header;
