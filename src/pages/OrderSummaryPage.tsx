import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { fetchDeliveryInfo } from "../ReduxToolkit/Slices/DeliveryInfoSlice";
import OnlinePaymentForm from "./OnlinePaymentForm";
import { placeOrderData } from "../services/OrderService";
import conf from "../config/Conf";
import { ClearCartData } from "../services/cartService";
import { CreateOrderDTO } from "../types/order";

interface OrderSummaryPageProps {
  onComplete: () => void;
}

const OrderSummaryPage: React.FC<OrderSummaryPageProps> = ({ onComplete }) => {
  const decoded = decodeToken();
  const userId = decoded?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const { cart } = useSelector((state: RootState) => state.cart);
  const { deliveryInfo } = useSelector(
    (state: RootState) => state.deliveryInfo,
  );

  const { paymentMethod, paymentDetails } = useSelector(
    (state: RootState) => state.payment,
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchcartProduct(userId));
    }
    dispatch(fetchDeliveryInfo());
  }, [dispatch, userId]);

  // const handlePlaceOrder = async () => {
  //   setLoading(true);
  //   try {
  //     const order = {
  //       userId,
  //       deliveryInfo,
  //       items: cart?.items,
  //       summary: cart?.summary,
  //       paymentMethod,
  //       paymentDetails,
  //     };

  //     const res = await placeOrderData(order);

  //     alert("Order placed successfully!");
  //     await ClearCartData(userId);
  //     if (userId) {
  //       dispatch(fetchcartProduct(userId));
  //     }
  //     onComplete();
  //   } catch (err: any) {
  //     console.error("Order failed:", err?.response?.data || err.message || err);
  //     alert("Something went wrong while placing the order.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlePlaceOrder = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!cart?.items || !cart.summary || !deliveryInfo) {
      alert("Incomplete order data");
      return;
    }

    setLoading(true);

    try {
      const order: CreateOrderDTO = {
        userId,
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        deliveryInfo: {
          address: `${deliveryInfo.address1}, ${deliveryInfo.address2}`,
          city: deliveryInfo.city,
          pincode: deliveryInfo.zip,
          phone: deliveryInfo.phoneNo,
        },
        summary: {
          subtotal: cart.summary.totalPrice,
          discount: cart.summary.totalDiscount,
          shipping: cart.summary.totalTax,
          total: cart.summary.finalTotal,
        },
        paymentMethod,
        paymentDetails,
      };

      const res = await placeOrderData(order);

      alert("Order placed successfully!");
      await ClearCartData(userId);
      dispatch(fetchcartProduct(userId));
      onComplete();
    } catch (err: any) {
      console.error("Order failed:", err?.response?.data || err.message || err);
      alert("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-3">
      <div className="space-y-3 bg-white p-4 shadow rounded">
        {/* Order Summary */}
        <div>
          <h3 className="font-heading text-lg font-medium">Order Summary</h3>
          {cart?.items.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-5 place-items-center gap-2 border-b"
            >
              <div
                className="
               aspect-square "
              >
                <img
                  className=" w-24
                       object-contain"
                  src={`${conf.BaseURL}${conf.GetImageUrl}/${item?.productId.image}`}
                  alt="product"
                />
              </div>
              <div className="col-span-3 ">
                <span className="font-heading text-[13px] line-clamp-3">
                  {item.productId.name} (x{item.quantity})
                </span>
              </div>
              <div>
                <span>₹{item.productId.price * item.quantity}</span>
              </div>
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
          <div>
            <p className="font-heading font-light text-[14px]">
              {deliveryInfo?.fullname}, {deliveryInfo?.phoneNo}
            </p>
            <p className="text-[14px] font-heading font-light">
              {deliveryInfo?.address1}, {deliveryInfo?.address2},{" "}
              {deliveryInfo?.city}, {deliveryInfo?.state} - {deliveryInfo?.zip}
            </p>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-black text-sm text-white px-4 py-2 rounded font-heading"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
