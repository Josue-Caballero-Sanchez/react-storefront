import { useState, useEffect, useRef } from "react";
import styles from "./HomeFilters.module.css";
import { FaChevronDown } from "react-icons/fa";

let filtersArray = [
  { id: "0", title: "Featured" },
  { id: "1", title: "Price: Low to High" },
  { id: "2", title: "Price: High to Low" },
  { id: "3", title: "Top Rated" },
];

type HomeFiltersProps = {
  activeButton: string;
  itemCount: number;
  handleFilterButtonClick(category: string): void;
  activeSort: string;
  handleSortMenuChanged(sortby: string): void;
};

function HomeFilters({
  activeButton,
  handleFilterButtonClick: handleButtonClick,
  itemCount,
  activeSort,
  handleSortMenuChanged,
}: HomeFiltersProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSortButtonClick(filterName: string): void {
    setIsDropdownOpen(!isDropdownOpen);
    handleSortMenuChanged(filterName);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div id="filters">
      <div className={styles.buttons__container}>
        <button
          className={activeButton === "" ? styles.active : ""}
          onClick={() => handleButtonClick("")}
        >
          Recommended
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
      <div className={styles.bottom__container}>
        <div className={styles.category__text}>
          {activeButton === "" ? "Recommended" : activeButton}
          <p className={styles.count__text}>({itemCount})</p>
        </div>
        <div className={styles.sort__container}>
          <p>SORT BY:</p>
          <div className={styles.dropdown__container} ref={dropdownRef}>
            <button
              className={styles.dropdown}
              onClick={(): void => setIsDropdownOpen(!isDropdownOpen)}
            >
              {activeSort} <FaChevronDown />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdown__menu}>
                {filtersArray
                  .filter((item) => item.title !== activeSort)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={(): void => handleSortButtonClick(item.title)}
                    >
                      {item.title}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFilters;
