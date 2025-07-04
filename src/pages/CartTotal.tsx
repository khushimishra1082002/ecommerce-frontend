import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import DeliveryInformation from "../pages/DeliveryInformation";

// 💡 Accept prop with default value true
interface CartTotalProps {
  showCheckoutButton?: boolean;
}

const CartTotal: React.FC<CartTotalProps> = ({ showCheckoutButton = true }) => {
  const decoded = decodeToken();
  const userId = decoded?.id;

  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);

  const totalPrice = cart?.summary?.totalPrice;
  const totalDiscount = cart?.summary?.totalDiscount;
  const totalTax = cart?.summary?.totalTax;
  const finalTotal = cart?.summary?.finalTotal;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchcartProduct(userId));
    }
  }, [dispatch, userId]);

  const handleCheckout = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  return (
    <>
      <div className="w-full bg-white p-4 space-y-4 shadow">
        <h2 className="text-lg font-body">Total Cart Price</h2>
        <div className="text-[13px] space-y-1">
          <div className="flex justify-between">
            <span className="font-heading font-light">Total Price</span>
            <span className="text-md font-heading">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-heading font-light">Total Discount</span>
            <span className="text-md font-heading text-green-400">₹{totalDiscount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-heading font-light">TAX</span>
            <span className="text-md font-heading">₹{totalTax}</span>
          </div>
        </div>

        <div className="bg-black/15 w-full h-[1px]"></div>

        <div className="flex justify-between">
          <span className="font-heading">Total</span>
          <span className="text-base font-heading">₹{finalTotal}</span>
        </div>

        {/* ✅ Conditionally show checkout button */}
        {showCheckoutButton && (
          <div>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-center text-white font-body font-medium p-2 rounded w-full"
            >
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-6/12 m-auto">
            <DeliveryInformation closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default CartTotal;
