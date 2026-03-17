import styles from "./Home.module.css";
import Header from "../../components/header/Header";
import HomeHeroSection from "../../components/homeHeroSection/HomeHeroSection";
import HomeFilters from "../../components/homeFilters/HomeFilters";
import HomeItems from "../../components/homeItems/HomeItems";
import { useEffect, useState } from "react";

const BASE_API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [originalProducts, setOriginalProducts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilterButton, setActiveFilterButton] = useState<string>("");
  const [activeSort, setActiveSort] = useState<string>("Featured");

  function sortProducts(sortBy: string) {
    if (sortBy === "Featured") {
      setProducts([...originalProducts]);
    } else if (sortBy === "Price: Low to High") {
      setProducts([...originalProducts].sort((a, b) => a.price - b.price));
    } else if (sortBy === "Price: High to Low") {
      setProducts([...originalProducts].sort((a, b) => b.price - a.price));
    } else if (sortBy === "Top Rated") {
      setProducts([...originalProducts].sort((a, b) => b.rating - a.rating));
    }
  }

  function handleSortMenuChanged(sortBy: string): void {
    setActiveSort(sortBy);
    sortProducts(sortBy);
  }

  function handleFilterButtonClick(buttonName: string) {
    if (activeFilterButton === buttonName) {
      return;
    }
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    setActiveSort("Featured");
    setActiveFilterButton(buttonName);
    fetchProducts(buttonName);
  }

  async function fetchProducts(category: string): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}/products/${category}`);

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

  function reloadAndReset() {
    setErrorMessage("");
    setActiveFilterButton("");
    setActiveSort("Featured");
    fetchProducts("");
  }

  useEffect(() => {
    fetchProducts("");
  }, []);

  return (
    <>
      <Header />
      <HomeHeroSection />
      <main className={styles.main}>
        <HomeFilters
          activeButton={activeFilterButton}
          handleFilterButtonClick={handleFilterButtonClick}
          itemCount={products.length}
          activeSort={activeSort}
          handleSortMenuChanged={handleSortMenuChanged}
        />
        <HomeItems
          products={products}
          loading={loading}
          errorMessage={errorMessage}
          reload={reloadAndReset}
        />
      </main>
    </>
  );
}

export default Home;
