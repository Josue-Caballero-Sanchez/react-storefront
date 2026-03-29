import Header from "../../components/header/Header";
import styles from "./OrderedPage.module.css";
import { CiCircleCheck } from "react-icons/ci";
import { useEffect } from "react";
import { useCartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function OrderedPage() {
  const cart = useCartContext();
  const navigate = useNavigate();

  function ClearCartItems(): void {
    cart.removeAllItemsFromCart();
  }

  function handleContinueShopping(): void {
    navigate("/");
    setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  useEffect(() => {
    ClearCartItems();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <CiCircleCheck className={styles.icon} />
        <p className={styles.main__text}>Order Placed!</p>
        <p>
          Unfortunately you will not receive any items since this is a fake
          store and their is no real order :(
        </p>
        <button
          className={styles.return__button}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </main>
    </>
  );
}

export default OrderedPage;
