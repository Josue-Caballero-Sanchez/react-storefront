import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);

  useEffect(() => {
    if (!isNavActive) return;

    const handleScroll = () => setIsNavActive(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavActive]);

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
        <input type="search" placeholder="Search products..." />
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
          </a>
        </nav>

        <a
          href="#"
          className={styles.header__toggle__button}
          onClick={(): void => setIsNavActive(!isNavActive)}
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
