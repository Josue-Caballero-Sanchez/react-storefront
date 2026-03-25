import styles from "./Home.module.css";
import Header from "../../components/header/Header";
import HomeHeroSection from "../../components/homeHeroSection/HomeHeroSection";
import HomeFilters from "../../components/homeFilters/HomeFilters";
import HomeItems from "../../components/homeItems/HomeItems";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BASE_API_URL = import.meta.env.VITE_API_URL;
export type Category = {
  id: string;
  name: string;
};

function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [originalProducts, setOriginalProducts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilterButton, setActiveFilterButton] =
    useState<string>("Recommended");
  const [productMenuText, setProductMenuText] = useState<string>("Recommended");
  const [activeSort, setActiveSort] = useState<string>("Featured");
  const [searchParams] = useSearchParams();

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

  function handleFilterButtonClick(category: Category) {
    if (activeFilterButton === category.name) {
      return;
    }
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    setActiveSort("Featured");
    setActiveFilterButton(category.name);
    setProductMenuText(category.name);
    fetchProducts(category.id);
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

  async function getSearchResults(search: string): Promise<void> {
    const element = document.getElementById("shop");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setLoading(true);
    setErrorMessage("");
    setProductMenuText(search);
    setActiveFilterButton("");
    setActiveSort("Featured");

    try {
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

  function reloadAndReset() {
    setErrorMessage("");
    setActiveFilterButton("Recommended");
    setProductMenuText("Recommended");
    setActiveSort("Featured");
    fetchProducts("");
  }

  useEffect(() => {
    const searchInput = searchParams.get("search");
    if (searchInput) {
      getSearchResults(searchInput);
    } else {
      fetchProducts("");
    }
  }, []);

  return (
    <>
      <Header getSearchResults={getSearchResults} />
      <HomeHeroSection />
      <main className={styles.main}>
        <HomeFilters
          activeFilterButton={activeFilterButton}
          productMenuText={productMenuText}
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
