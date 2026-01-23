import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { fetchDeliveryInfo } from "../ReduxToolkit/Slices/DeliveryInfoSlice";
import { placeOrderData } from "../services/OrderService";
import OnlinePaymentForm from "./OnlinePaymentForm";
import { setPaymentMethod } from "../ReduxToolkit/Slices/PaymentSlice";

interface PaymentMethodProps {
  onComplete: () => void;
}

const Paymentmethods:React.FC<PaymentMethodProps>  = ({ onComplete }) => {

  const decoded = decodeToken();
  const userId = decoded?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { cart } = useSelector((state: RootState) => state.cart);
  const { deliveryInfo } = useSelector(
    (state: RootState) => state.deliveryInfo,
  );
  const { paymentMethod } = useSelector((state: RootState) => state.payment);

  console.log("paymentMethod", paymentMethod);

  const handlePaymentMethod = (method: string) => {
    dispatch(setPaymentMethod(method));
    alert("Payment method selected successfully");
  };

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchcartProduct(userId));
  //     dispatch(fetchDeliveryInfo());
  //   }
  // }, [dispatch, userId]);

  // const handlePlaceOrder = async (paymentData) => {
  //   try {
  //     const order = {
  //       userId,
  //       deliveryInfo,
  //       items: cart?.items,
  //       summary: cart?.summary,
  //       paymentMethod,
  //       paymentDetails: paymentData,
  //     };

  //     const res = await placeOrderData(order);
  //     alert("Order placed successfully!");
  //     onComplete(); // move to Order Summary

  //   } catch (err: any) {
  //     console.error("Order failed:", err?.response?.data || err.message || err);
  //     alert("Something went wrong while placing the order.");
  //   }
  // };

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      {/* Payment Selection */}
      <div>
        <h3 className="font-heading text-base font-medium mb-4">
          Select Payment Method
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {["COD", "Online"].map((method) => (
            <label
              key={method}
              className={`border rounded-md p-4 cursor-pointer flex items-center justify-between transition 
                  ${paymentMethod === method ? "" : ""}`}
            >
              <span className="text-sm font-heading">
                {method === "COD" ? "Cash on Delivery" : "Online Payment"}
              </span>
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => handlePaymentMethod(method)}
                className="accent-blue-600"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      {paymentMethod === "COD" ? (
        <button
          onClick={() => {
            onComplete();
          }}
          className=" bg-black text-sm
               text-white py-2 px-4 rounded font-heading font-medium "
        >
          Cash on Delivery
        </button>
      ) : (
        <OnlinePaymentForm onComplete={onComplete} />
      )}
    </div>
  );
};

export default Paymentmethods;
