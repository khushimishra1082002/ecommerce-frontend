import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import CartTotal from "./CartTotal";
import { useNavigate } from "react-router-dom";
import { fetchDeliveryInfo } from "../ReduxToolkit/Slices/DeliveryInfoSlice";

const OrderSummaryPage = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { cart, loading } = useSelector((state: RootState) => state.cart);

  const { deliveryInfo } = useSelector(
    (state: RootState) => state.deliveryInfo
  );

  console.log("deliveryInfo", deliveryInfo);

  console.log(deliveryInfo.fullname);

  useEffect(() => {
    dispatch(fetchcartProduct(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchDeliveryInfo());
  }, [dispatch]);

  const items = cart?.items || [];

  const handleProceed = () => {
    navigate("/paymentPage");
  };

  return (
    <div className=" bg-gray-50 p-4 flex justify-center items-center">
      <div className="grid grid-cols-4 gap-3 min-h-80">
        <div className="col-span-2">
          <div className="w-full max-w-4xl bg-white shadow-lg p-6">
            <h2 className="text-xl font-medium mb-6 border-b pb-4 font-heading">
              Your Orders
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={`http://localhost:5000/api/upload/${item.productId.image}`}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-heading line-clamp-2 ">
                      {item.productId.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-semibold">
                    ₹{(item.productId.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <CartTotal showCheckoutButton={false} />
          <div className="mt-4">
            <button
              onClick={() => handleProceed()}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
        <div>
          {deliveryInfo && (
            <div className="w-full bg-white shadow-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium font-subHeading">
                  Delivery Information
                </h2>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-heading text-[13px]">
                  {" "}
                  <span className="font-body font-medium">Name : </span>
                  {deliveryInfo.fullname}
                </p>
                <p className="font-heading text-[13px]">
                  <span className="font-body font-medium">Email : </span>
                  {deliveryInfo.email}
                </p>
                <p className="font-heading text-[13px]">
                  <span className="font-body font-medium">Phone no. : </span>
                  {deliveryInfo.phoneNo}
                </p>
                <p className="font-heading text-[13px]">
                  <span className="font-body font-medium">Address : </span>
                  {deliveryInfo.address1}, {deliveryInfo.address2}
                </p>
                <p className="font-heading text-[13px]">
                  <span className="font-body font-medium">City : </span>
                  {deliveryInfo.city}, {deliveryInfo.state} - {deliveryInfo.zip}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleProceed()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
