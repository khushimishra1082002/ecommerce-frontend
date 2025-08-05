import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { fetchDeliveryInfo } from "../ReduxToolkit/Slices/DeliveryInfoSlice";
import { placeOrderData } from "../services/OrderService";
import OnlinePaymentForm from "./OnlinePaymentForm";

const PaymentPage = () => {
  const [showPaymentModel, setShowPaymentModel] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const decoded = decodeToken();
  const userId = decoded?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { cart } = useSelector((state: RootState) => state.cart);
  const { deliveryInfo } = useSelector(
    (state: RootState) => state.deliveryInfo
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchcartProduct(userId));
      dispatch(fetchDeliveryInfo());
    }
  }, [dispatch, userId]);

 const handlePlaceOrder = async (paymentData: {
  upiId: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}) => {
  try {
    const order = {
      userId,
      deliveryInfo,
      items: cart?.items,
      summary: cart?.summary,
      paymentMethod,
      paymentDetails: paymentData, 
    };

    console.log(" Order payload:", order);

    const res = await placeOrderData(order);
    console.log(" Order placed:", res.data || res);

    alert("Order placed successfully!");
    
  } catch (err: any) {
    console.error(" Order failed:", err?.response?.data || err.message || err);
    alert("Something went wrong while placing order.");
  }
};


  useEffect(() => {
    if (showPaymentModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showPaymentModel]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-3">
      <h2 className="text-xl font-heading font-semibold">Payment</h2>

      <div className="space-y-3 bg-white p-4 shadow rounded">
        {/* Order Summary */}
        <div>
          <h3 className="font-heading text-lg font-medium">Order Summary</h3>
          {cart?.items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm border-b py-2"
            >
              <span className="font-heading font-light">
                {item.productId.name} (x{item.quantity})
              </span>
              <span>₹{item.productId.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold font-heading pt-2">
            <span>Total</span>
            <span>₹{cart?.summary?.finalTotal}</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="space-y-1">
          <h3 className="font-heading text-sm font-medium">Delivery Info</h3>
          <p className="font-heading font-light text-[14px]">
            {deliveryInfo?.fullname}, {deliveryInfo?.phoneNo}
          </p>
          <p className="text-[14px] font-heading font-light">
            {deliveryInfo?.address1}, {deliveryInfo?.address2},{" "}
            {deliveryInfo?.city}, {deliveryInfo?.state} - {deliveryInfo?.zip}
          </p>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <h3 className="font-heading text-sm font-medium">Payment Method</h3>
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => {
                  setPaymentMethod("COD");
                  setShowPaymentModel(false);
                }}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => {
                  setPaymentMethod("Online");
                  setShowPaymentModel(true);
                }}
              />
              Online Payment
            </label>
          </div>

          {showPaymentModel && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
              <div className="bg-white rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                <OnlinePaymentForm
                  onClose={() => setShowPaymentModel(false)}
                  handlePlaceOrder={handlePlaceOrder}
                />
              </div>
            </div>
          )}
        </div>

        {/* COD Button Only */}
        {paymentMethod === "COD" && (
          <button
            onClick={() => handlePlaceOrder()}
            className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded font-medium font-heading"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
