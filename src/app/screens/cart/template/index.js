"use client";
import axios from "axios";
import Loader from "@/components/Loader";
import styles from "@/css/Cart.module.css";
import { useState, useEffect } from "react";
import { apiConfig } from "@/config/apiConfig";
import NextImage from "@/components/NextImage";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const CartPage = () => {
  const [cart, setCarts] = useState([]);
  const showAlertMessage = useSnackbar();
  const [loading, setLoading] = useState(false);

  const getCarts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("cart/api");
      const cartItems = res?.data?.cart || [];
      setCarts(cartItems);
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`cart/api/${id}`, { data: { id } });

      if (res?.status === 200) {
        showAlertMessage({ message: res.data.message, type: "success" });
        setCarts((prev) => prev.filter((car) => car._id !== id));
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllCart = async () => {
    try {
      setLoading(true);
      const res = await axios.delete("cart/api");

      if (res?.status === 200) {
        showAlertMessage({ message: res.data.message, type: "success" });
        setCarts([]);
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className={styles.wrap}>
        <h1 className={styles.title}>Your Cart</h1>

        <div className={styles.grid}>
          {/* Cart Items */}
          <div className={styles.itemsCard}>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item._id} className={styles.itemRow}>
                  <div className={styles.imgBox}>
                    <NextImage
                      src={`${apiConfig.baseUrl}${item.image}`}
                      alt="Prdouct"
                      fill={false}
                      height={80}
                      width={80}
                      style={{ objectFit: "fill" }}
                    />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>
                      {item?.productId?.name || "Unknown"}
                    </div>
                    <div className={styles.meta}>Size: {item.size}</div>
                    <div className={styles.price}>Rs {item.price}</div>
                  </div>
                  <div className={styles.qtyBox}>Qty: {item.quantity}</div>
                  <div className={styles.lineTotal}>
                    Rs {item.price * item.quantity}
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleDelete(item?._id)}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>

          {/* Summary */}
          {cart.length > 0 ? (
            <div className={styles.summaryCard}>
              <h2>Summary</h2>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>
                  Rs{" "}
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  )}
                </span>
              </div>
              <div className={styles.row}>
                {/* <span>Shipping</span>
              <span>Rs 250</span> */}
              </div>
              <div className={styles.divider} />
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>
                  Rs{" "}
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  ) + 0}
                </span>
              </div>
              <button className={styles.checkoutBtn}>Checkout</button>
              <button
                type="button"
                onClick={handleDeleteAllCart}
                className={styles.removeAllBtn}
              >
                Remove All Cart Items
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
