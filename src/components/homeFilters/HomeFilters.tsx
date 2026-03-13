import styles from "./HomeFilters.module.css";
import { useState } from "react";

type HomeFiltersProps = {
  loading: boolean;
  errorMessage: string;
  activeButton: string;
  productsNull: boolean;
  handleButtonClick(category: string): void;
};

function HomeFilters({
  loading,
  errorMessage,
  activeButton,
  productsNull,
  handleButtonClick,
}: HomeFiltersProps) {
  return (
    <div id="filters">
      {!loading && errorMessage === "" && !productsNull && (
        <>
          <div className={styles.buttons__container}>
            <button
              className={activeButton === "" ? styles.active : ""}
              onClick={() => handleButtonClick("")}
            >
              All
            </button>
            <button
              className={activeButton === "Furniture" ? styles.active : ""}
              onClick={() => handleButtonClick("Furniture")}
            >
              Furniture
            </button>
            <button
              className={activeButton === "Beauty" ? styles.active : ""}
              onClick={() => handleButtonClick("Beauty")}
            >
              Beauty
            </button>
            <button
              className={activeButton === "Groceries" ? styles.active : ""}
              onClick={() => handleButtonClick("Groceries")}
            >
              Groceries
            </button>
            <button
              className={activeButton === "Fragrances" ? styles.active : ""}
              onClick={() => handleButtonClick("Fragrances")}
            >
              Fragrances
            </button>
          </div>
          <div className={styles.category__text}>
            All Items
            <p className={styles.count__text}>(8)</p>
          </div>
        </>
      )}
    </div>
  );
}

export default HomeFilters;
