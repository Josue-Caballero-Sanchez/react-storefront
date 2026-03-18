import styles from "./HomeHeroSection.module.css";

function HomeHeroSection() {
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    target.style.transform = `
    perspective(500px)
    rotateX(${-rotateX}deg)
    rotateY(${rotateY}deg)
  `;
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>): void {
    e.currentTarget.style.transform = `
    perspective(500px)
    rotateX(0deg)
    rotateY(0deg)
  `;
  }

  return (
    <div className={styles.container}>
      <div className={styles.main__container}>
        <div className={styles.left__container}>
          <h1>Welcome to my Storefront!</h1>
          <p>
            This is not a commercial project. You can't buy any items here and
            all of the prices are generated to imitate a real store. Enjoy!
          </p>
          <a href="#filters">Shop Now</a>
        </div>

        <div className={styles.right__container}>
          <div
            className={styles.icon}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            🪑
            <p className={styles.icon__text}>Furniture</p>
          </div>
          <div
            className={styles.icon}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            🍅
            <p className={styles.icon__text}>Groceries</p>
          </div>
          <div
            className={styles.icon}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            💄
            <p className={styles.icon__text}>Beauty</p>
          </div>
          <div
            className={styles.icon}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            💻<p className={styles.icon__text}>Tech</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeroSection;
