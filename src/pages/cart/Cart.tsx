import Header from "../../components/header/Header";
import { useCartContext } from "../../contexts/CartContext";
import styles from "./Cart.module.css";
import { BsCartX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import type { Item } from "../../contexts/CartContext";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

function Cart() {
  const cart = useCartContext();
  const navigate = useNavigate();

  function handleContinueShopping(): void {
    navigate("/");
    setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function getCartTotal(): number {
    let cartTotal = 0;

    for (let i = 0; i < cart.cartItems.length; i++) {
      cartTotal += cart.cartItems[i].price;
    }
    return cartTotal;
  }

  function handleAddItemButton(item: Item): void {
    if (!cart.isItemInCart(item.id, item.name)) {
      cart.addItemToCart(item);
    } else {
      cart.removeItemFromCart(item);
    }
  }

  if (cart.cartItems.length <= 0) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <p className={styles.heading__text}>
            Shopping Cart ({cart.cartItems.length})
          </p>
          <div className={styles.center__container}>
            <BsCartX className={styles.icon} />
            <p>Your Cart is Empty</p>
            <button
              className={styles.return__button}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <p className={styles.heading__text}>
          Shopping Cart ({cart.cartItems.length})
        </p>
        <div className={styles.items__container}>
          {cart.cartItems.map((product) => (
            <div key={product.id} className={styles.item}>
              <img src={product.imageURL} alt={`${product.name} thumbnail`} />
              <div className={styles.item__details}>
                <p className={styles.category__text}>{product.category}</p>
                <p className={styles.title__text}>{product.name}</p>
                <p className={styles.rating__text}>{product.rating}/5</p>
                <p className={styles.shipping__text}>{product.shippingInfo}</p>
                <div className={styles.price__container}>
                  <p>${product.price}</p>
                  {product.price != parseInt(product.discountPrice) && (
                    <>
                      <p className={styles.original__price}>
                        ${product.discountPrice}
                      </p>
                      <p className={styles.discount__text}>
                        {product.discountPercentage}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <button
                    className={styles.disabled__button}
                    onClick={(): void =>
                      handleAddItemButton({
                        id: product.id,
                        name: product.name,
                        imageURL: product.imageURL,
                        category: product.category.toUpperCase(),
                        rating: product.rating + "/5",
                        shippingInfo: product.shippingInfo,
                        discountPrice: product.discountPrice,
                        discountPercentage: product.discountPercentage,
                        price: product.price,
                      })
                    }
                  >
                    {cart.isItemInCart(product.id, product.name) ? (
                      <span key="remove" className={styles.button__content}>
                        <MdOutlineRemoveShoppingCart />
                        Remove from Cart
                      </span>
                    ) : (
                      <span key="add" className={styles.button__content}>
                        <IoCartOutline />
                        Add to Cart
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.info__text__container}>
          <p>Shipping: Free</p>
          <p>Total: ${getCartTotal().toFixed(2)}</p>
        </div>
        <div className={styles.buttons__container}>
          <Link to="/checkout" className={styles.button}>
            Checkout
          </Link>
          <button onClick={(): void => cart.removeAllItemsFromCart()}>
            Clear Cart
          </button>
        </div>
      </main>
    </>
  );
}

export default Cart;
