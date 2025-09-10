"use client";
import axios from "axios";
import Loader from "@/components/Loader";
import styles from "@/css/Cart.module.css";
import { useState, useEffect } from "react";
import { apiConfig } from "@/config/apiConfig";
import NextImage from "@/components/NextImage";
import EmptyState from "@/components/EmptyState";
import { useSnackbar } from "@/components/Snackbar";
import ConfirmModal from "@/components/ConfirmModal";
import handleAxiosError from "@/components/HandleAxiosError";

const CartPage = () => {
  const [cart, setCarts] = useState([]);
  const showAlertMessage = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);

  // 🔴 Modal states
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState(""); // "single" or "all"
  const [deleteId, setDeleteId] = useState(null);

  const getCarts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("cart/api");
      const cartItems = res?.data?.cart || [];
      setCarts(cartItems);

      // ✅ Only first product shipping fee
      if (cartItems.length > 0) {
        setShippingFee(cartItems[0]?.productId?.shippingFee || 0);
      } else {
        setShippingFee(0);
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
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
      showAlertMessage({ message, type: "error" });
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
        setShippingFee(0);
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Confirm handler (single or all)
  const confirmDelete = async () => {
    if (deleteType === "single" && deleteId) {
      await handleDelete(deleteId);
    } else if (deleteType === "all") {
      await handleDeleteAllCart();
    }
    setShowModal(false);
    setDeleteId(null);
    setDeleteType("");
  };

  // 🟢 Subtotal & Total (discount aware)
  const subtotal = cart.reduce((acc, item) => {
    const effectivePrice =
      item.productId?.discount && Number(item.productId.discount) > 0
        ? Number(item.productId.discount)
        : Number(item.productId?.price || 0);
    return acc + effectivePrice * item.quantity;
  }, 0);

  const total = subtotal + Number(shippingFee || 0);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.wrap}>
          <h1 className={styles.title}>Your Cart</h1>

          <div className={styles.grid}>
            {cart.length > 0 ? (
              <>
                {/* 🟢 Cart Items */}
                <div className={styles.itemsCard}>
                  {cart.map((item) => {
                    const effectivePrice =
                      item.productId?.discount &&
                      Number(item.productId.discount) > 0
                        ? Number(item.productId.discount)
                        : Number(item.productId?.price || 0);
                    return (
                      <div key={item._id} className={styles.itemRow}>
                        <div className={styles.imgBox}>
                          <NextImage
                            src={`${apiConfig.baseUrl}${item.image}`}
                            alt="Product"
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
                          <div className={styles.price}>
                            {item.productId?.discount &&
                            Number(item.productId.discount) > 0 ? (
                              <span> {item.productId.discount} Rs</span>
                            ) : (
                              <span> {item.productId.price} Rs</span>
                            )}
                          </div>
                        </div>
                        <div className={styles.qtyBox}>
                          Qty: {item.quantity}
                        </div>
                        <div className={styles.lineTotal}>
                          Rs {effectivePrice * item.quantity}
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => {
                            setDeleteType("single");
                            setDeleteId(item._id);
                            setShowModal(true);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* 🟢 Summary */}
                <div className={styles.summaryCard}>
                  <h2>Summary</h2>
                  <div className={styles.row}>
                    <span>Subtotal</span>
                    <span>Rs {subtotal}</span>
                  </div>

                  <div className={styles.row}>
                    <span>Shipping</span>
                    <span>Rs {shippingFee}</span>
                  </div>

                  <div className={styles.divider} />
                  <div className={styles.totalRow}>
                    <span>Total</span>
                    <span>Rs {total}</span>
                  </div>

                  <button className={styles.checkoutBtn}>Checkout</button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteType("all");
                      setShowModal(true);
                    }}
                    className={styles.removeAllBtn}
                  >
                    Remove All Cart Items
                  </button>
                </div>
              </>
            ) : (
              // 🟥 Empty state takes full grid space
              <div className={styles.emptyWrap}>
                <EmptyState message="Your cart is empty" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔴 Confirm Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={
          deleteType === "all"
            ? "Are you sure you want to remove all items from cart?"
            : "Are you sure you want to remove this item?"
        }
      />
    </>
  );
};

export default CartPage;
