import styles from "./Home.module.css";
import Header from "../../components/header/Header";
import HomeHeroSection from "../../components/homeHeroSection/HomeHeroSection";
import HomeFilters from "../../components/homeFilters/HomeFilters";
import HomeItems from "../../components/homeItems/HomeItems";
import { useEffect, useState } from "react";

const BASE_API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilterButton, setActiveFilterButton] = useState<string>("");

  function handleFilterButtonClick(buttonName: string) {
    if (activeFilterButton === buttonName) {
      return;
    }
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
          loading={loading}
          errorMessage={errorMessage}
          activeButton={activeFilterButton}
          handleButtonClick={handleFilterButtonClick}
          productsNull={products.length === 0 || products === null}
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
