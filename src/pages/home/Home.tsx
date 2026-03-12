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

  useEffect(() => {
    async function fetchAllProducts(): Promise<void> {
      try {
        const response = await fetch(`${BASE_API_URL}/products`);

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          setLoading(false);
          setErrorMessage("Failed to fetch products. Please try again later.");
          return;
        }

        const data = await response.json();
        console.log(data);
        setLoading(false);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
        setErrorMessage(
          "An error occurred while fetching products. Please try again later.",
        );
      }
    }

    fetchAllProducts();
  }, []);

  return (
    <>
      <Header />
      <HomeHeroSection />
      <main className={styles.main}>
        <HomeFilters loading={loading} errorMessage={errorMessage} />
        <HomeItems
          products={products}
          loading={loading}
          errorMessage={errorMessage}
        />
      </main>
    </>
  );
}

export default Home;
