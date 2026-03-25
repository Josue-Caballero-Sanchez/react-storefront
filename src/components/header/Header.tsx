import styles from "./Header.module.css";
import { useState, useRef } from "react";
import { CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useCartContext } from "../../contexts/CartContext";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

type HeaderProps = {
  getSearchResults?(search: string): void;
};

function Header({ getSearchResults }: HeaderProps) {
  const [isNavActive, setIsNavActive] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const cart = useCartContext();
  const favorites = useFavoritesContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleSearch(): void {
    const searchInput = searchRef.current?.value;
    if (!searchInput) {
      return;
    }

    searchRef.current?.blur();

    if (getSearchResults) {
      navigate(`/?search=${searchInput}`);
      getSearchResults(searchInput);
    } else {
      navigate(`/?search=${searchInput}`);
    }
  }

  return (
    <header className={styles.header}>
      {isNavActive && (
        <div
          onClick={(): void => setIsNavActive(false)}
          className={styles.overlay}
        ></div>
      )}
      <div className={styles.header__container}>
        <Link reloadDocument to="/" className={styles.logo}>
          Shopp
        </Link>
        <div className={styles.search__container}>
          <input
            id="search"
            type="search"
            placeholder="Search products..."
            ref={searchRef}
            defaultValue={searchParams.get("search") ?? ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <div className={styles.search__icon__container}>
            <IoIosSearch
              className={styles.search__icon}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={handleSearch}
            />
          </div>
        </div>
        <nav className={isNavActive ? styles.nav__active : ""}>
          <a
            className={styles.nav__item}
            href="#shop"
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
          <Link
            className={styles.nav__item}
            to="/cart"
            onClick={(): void => setIsNavActive(false)}
          >
            <IoCartOutline />
            <p>Cart</p>
            {cart.cartItems.length > 0 && (
              <div className={styles.item__count__container}>
                <p className={styles.item__count}>{cart.cartItems.length}</p>
              </div>
            )}
          </Link>
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
