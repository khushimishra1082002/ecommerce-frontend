import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import DeliveryInformation from "../pages/DeliveryInformation";
import { useNavigate } from "react-router-dom";

interface CartTotalProps {
  showCheckoutButton?: boolean;
}

const CartTotal: React.FC<CartTotalProps> = ({ showCheckoutButton = true }) => {
  const navigate = useNavigate()
  const decoded = decodeToken();
  const userId = decoded?.id;

  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);

  const totalPrice = cart?.summary?.totalPrice || 0;
  const totalDiscount = cart?.summary?.totalDiscount || 0;
  const totalTax = cart?.summary?.totalTax || 0;
  const finalTotal = cart?.summary?.finalTotal || 0;

  

  useEffect(() => {
    if (userId) {
      dispatch(fetchcartProduct(userId));
    }
  }, [dispatch, userId]);

  

  

  return (
    <>
      <div className=" w-full h-full  shadow rounded-md bg-white ">
        <div className="  grid items-end ">
          <div className="w-full h-full  p-4">
            <h4 className="font-heading font-semibold text-lg  p-2">
              Payment Detail{" "}
            </h4>
            <div className="flex justify-between items-center p-3 border-b border-b-slate-300/40">
              <span className="text-black/70 font-heading text-sm">
                MRP Total
              </span>
              <span className="text-black/70  font-semibold">
                ₹{totalPrice}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-b-slate-300/40">
              <span className="text-black/70  font-heading text-sm">
                Product Discount
              </span>
              <span className="  font-bold text-green-700">
                -₹{totalDiscount}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-b-slate-300/40">
              <span className="text-black/70  font-heading text-sm">
                Delivery Fee (SmartBazaar)
              </span>
              <span className="  font-bold text-green-700">FREE </span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-b-slate-300/40">
              <span className="text-black/70  font-heading text-sm">
                Delivery Fee (JioMart)
              </span>
              <span className="  font-bold text-green-700">FREE </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-3 border-b border-b-slate-300/40">
                <span className="text-black/70  font-heading text-base font-bold">
                  Total
                </span>
                <span className="   text-black font-black">₹{finalTotal} </span>
              </div>
              {totalDiscount > 0 && (
                <span className="w-full flex justify-end font-bold text-green-700">
                  You Saved ₹{totalDiscount}
                </span>
              )}
            </div>
            {showCheckoutButton && (
              <div>
                <button onClick={() => navigate("/checkout")}
                 
                  className="btn border rounded text-white font-semibold
               font-heading p-2 w-full bg-black my-2 text-base"
                >
                  Proceed To Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </>
  );
};

export default CartTotal;
