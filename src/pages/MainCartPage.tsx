import React, { useEffect } from "react";
import Cart from "./Cart";
import CartTotal from "./CartTotal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { useNavigate } from "react-router-dom";

const MainCartPage = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;
  const navigate = useNavigate()

  console.log("decodeUser", userId);

  const dispatch = useDispatch<AppDispatch>();

  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  console.log("cart", cart);

  useEffect(() => {
    if (userId) {
      dispatch(fetchcartProduct(userId));
    }
  }, [dispatch]);

  const isLoggedIn = !!userId;
  const isCartEmpty = cart?.items?.length === 0;

  return (
    <div className="bg-gray-50 min-h-[60vh] flex items-center justify-center px-4 md:px-6 py-6">
      {!isLoggedIn ? (
        <div className="text-center py-10 bg-white w-full">
          <div>
            <img
              className="w-44 m-auto"
              src="https://t3.ftcdn.net/jpg/01/97/57/66/360_F_197576699_QxGIuWnWCJHAMXiSCuVH9YPYtyMwjpJz.jpg"
            />
          </div>
          <h2 className="text-xl font-heading font-medium text-gray-700">
            🔒 Please sign in to view your cart
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-body">
            You need to be logged in to access your cart.
          </p>
        </div>
      ) : isCartEmpty ? (
        <div className="text-center py-10 bg-white w-full">
          <div>
            <img
              className="w-60 m-auto"
              src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
            />
          </div>
          <h2 className="text-xl font-medium font-heading text-gray-700">
            🛒 Your cart is empty
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-body">
            Looks like you haven’t added anything yet.
          </p>
           <button
            onClick={() => navigate("/")}
            className="bg-black text-sm font-heading my-2
             text-white font-medium py-2 px-4 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          {/* Cart Section */}
          <div className="w-full lg:w-[73%] max-h-[70vh] overflow-y-auto">
            <Cart />
          </div>

          {/* Cart Total Section */}
          <div className="w-full lg:w-[27%]">
            <CartTotal />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCartPage;
