import styles from "./HomeFilters.module.css";

function HomeFilters() {
  return (
    <div id="filters">
      <div className={styles.buttons__container}>
        <button className={styles.active}>All</button>
        <button>Furniture</button>
        <button>Beauty</button>
        <button>Groceries</button>
        <button>Fragrances</button>
      </div>
      <div className={styles.category__text}>
        All Items
        <p className={styles.count__text}>(8)</p>
      </div>
    </div>
  );
}

export default HomeFilters;
