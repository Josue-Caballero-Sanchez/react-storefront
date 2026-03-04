import styles from "./HomeFilters.module.css";

function HomeFilters() {
  return (
    <div id="filters">
      <div className={styles.buttons__container}>
        <button className={styles.active}>All</button>
        <button>Electronics</button>
        <button>Clothes</button>
        <button>Electronics</button>
        <button>Clothes</button>
        <button>Electronics</button>
      </div>
      <p className={styles.category__text}>
        All Items
        <p className={styles.count__text}>(8)</p>
      </p>
    </div>
  );
}

export default HomeFilters;
