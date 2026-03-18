import { useState, useEffect, useRef } from "react";
import styles from "./HomeFilters.module.css";
import { FaChevronDown } from "react-icons/fa";
import type { Category } from "../../pages/home/Home";

const filtersArray = [
  { id: "0", title: "Featured" },
  { id: "1", title: "Price: Low to High" },
  { id: "2", title: "Price: High to Low" },
  { id: "3", title: "Top Rated" },
];

const categories = [
  { id: "", name: "Recommended" },
  { id: "groceries", name: "Groceries" },
  { id: "beauty", name: "Beauty" },
  { id: "fragrances", name: "Fragrances" },
  { id: "home-decoration", name: "Home Decoration" },
  { id: "furniture", name: "Furniture" },
  { id: "kitchen-accessories", name: "Kitchen Accessories" },
  { id: "laptops", name: "Laptops" },
  { id: "smartphones", name: "Smartphones" },
  { id: "mens-shirts", name: "Mens Shirts" },
  { id: "mens-shoes", name: "Mens Shoes" },
  { id: "tops", name: "Womens Tops" },
  { id: "womens-shoes", name: "Womens Shoes" },
  { id: "womens-bags", name: "Womens Bags" },
];

type HomeFiltersProps = {
  activeFilterButton: string;
  itemCount: number;
  handleFilterButtonClick(category: Category): void;
  activeSort: string;
  handleSortMenuChanged(sortby: string): void;
};

function HomeFilters({
  activeFilterButton,
  handleFilterButtonClick,
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
        {categories.map((category) => (
          <button
            key={category.id}
            className={
              activeFilterButton === category.name ? styles.active : ""
            }
            onClick={() => handleFilterButtonClick(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className={styles.bottom__container}>
        <div className={styles.category__text}>
          {activeFilterButton}
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
