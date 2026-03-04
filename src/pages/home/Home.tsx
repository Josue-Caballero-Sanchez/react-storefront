import styles from "./Home.module.css";
import Header from "../../components/header/Header";
import HomeHeroSection from "../../components/homeHeroSection/HomeHeroSection";
import HomeFilters from "../../components/homeFilters/HomeFilters";
import HomeItems from "../../components/homeItems/HomeItems";

function Home() {
  return (
    <>
      <Header />
      <HomeHeroSection />
      <main className={styles.main}>
        <HomeFilters />
        <HomeItems />
      </main>
    </>
  );
}

export default Home;
