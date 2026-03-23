import styles from "./Header.module.css";
import { useState, useRef } from "react";
import { CiHeart, CiShoppingTag } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useCartContext } from "../../contexts/CartContext";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { IoIosSearch } from "react-icons/io";

const BASE_API_URL = import.meta.env.VITE_API_URL;

type HeaderProps = {
  setProducts(products: any[]): void;
  setOriginalProducts(originalProducts: any[]): void;
  setLoading(loading: boolean): void;
  setErrorMessage(errorMessage: string): void;
  setActiveFilterButton(activeFilterButton: string): void;
  setProductMenuText(productMenuText: string): void;
  setActiveSort(activeSort: string): void;
};

function Header({
  setProducts,
  setLoading,
  setErrorMessage,
  setActiveFilterButton,
  setProductMenuText,
  setActiveSort,
  setOriginalProducts,
}: HeaderProps) {
  const [isNavActive, setIsNavActive] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const cart = useCartContext();
  const favorites = useFavoritesContext();

  async function getSearchResults(search: string): Promise<void> {
    setLoading(true);
    setErrorMessage("");
    setProductMenuText(search);
    setActiveFilterButton("");
    setActiveSort("Featured");
    searchRef.current?.blur();

    try {
      const element = document.getElementById("shop");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      const response = await fetch(`${BASE_API_URL}/products/search/${search}`);

      if (!response.ok) {
        setLoading(false);
        setErrorMessage("Failed to fetch products. Please try again later.");
        return;
      }

      const data = await response.json();
      setLoading(false);
      setOriginalProducts(data);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        "An error occurred while fetching products. Please try again later.",
      );
    }
  }

  function handleSearch(): void {
    const searchInput = document.getElementById("search") as HTMLInputElement;
    getSearchResults(searchInput.value);
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
        <a className={styles.logo} href="#">
          Shopp
        </a>
        <div className={styles.search__container}>
          <input
            id="search"
            type="search"
            placeholder="Search products..."
            ref={searchRef}
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
