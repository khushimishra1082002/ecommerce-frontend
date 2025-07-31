import React, { useState, useEffect } from "react";
import { FaCartArrowDown, FaTruck, FaTags, FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { decodeToken } from "../utils/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import Searchbar from "./Searchbar";
import { Menu, X } from "lucide-react";
import { fetchWishlistProduct } from "../ReduxToolkit/Slices/WishlistSlice";
import { logout } from "../ReduxToolkit/Slices/AuthSlice";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const decoded = decodeToken();
  const userId = decoded?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist, loading, error } = useSelector(
    (state: RootState) => state.wishlists
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistProduct(userId));
      dispatch(fetchcartProduct(userId));
    }
  }, [userId]);

  const wishlistCount = wishlist?.products?.length || 0;
  const cartCount = cart?.items?.length;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-skin-secondary px-4 md:px-6 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
          <span className="text-[13px] text-gray-400 font-body">
            Welcome to our worldwide Megamart
          </span>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaLocationDot className="text-skin-primary text-sm" />
              <span className="text-[13px] text-gray-400 font-body">
                Deliver to{" "}
                <strong className="text-gray-500 text-[12px] font-heading"></strong>
              </span>
            </div>
            <div className="h-[12px] w-[1px] bg-black" />
            <div className="flex items-center gap-1">
              <FaTruck className="text-skin-primary text-sm" />
              <span className="text-[13px] text-gray-400 font-body">
                Track Your Order
              </span>
            </div>
            <div className="h-[12px] w-[1px] bg-black" />
            <div className="flex items-center gap-1">
              <FaTags className="text-skin-primary text-sm" />
              <span className="text-[13px] text-gray-400 font-body">
                All Offers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-skin-white_shade sticky top-0 z-50 shadow-sm px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <FaCartArrowDown className="text-xl text-skin-primary" />
            <span className="text-xl font-heading font-extrabold tracking-wider text-skin-primary">
              MegaMart
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="text-2xl text-skin-primary" />
              ) : (
                <Menu className="text-2xl text-skin-primary" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Searchbar />

            {/* User Section */}
            <div className="relative group">
              {decoded ? (
                <div className="flex flex-col items-start cursor-pointer group relative">
                  <div className="flex items-center gap-1">
                    <MdAccountCircle className="text-skin-primary text-xl" />
                    <span className="text-[11px] text-gray-500">Hello,</span>
                  </div>
                  <span className="text-[13px] font-heading text-gray-800 capitalize">
                    {decoded?.name || decoded?.email?.split("@")[0] || "User"}
                  </span>

                  <div className="absolute top-full left-0 py-2 bg-white shadow-lg rounded w-40 hidden group-hover:block z-50">
                    <Link
                      to="/userProfile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-cyan-50 font-body"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        window.location.href = "/IsLoggedIn";
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-body"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/IsLoggedIn" className="flex items-center gap-1">
                  <span className="text-sm font-heading text-gray-800">
                    Sign In
                  </span>
                  <LuUser className="text-skin-primary text-xl" />
                </Link>
              )}
            </div>

            {/* Cart & Wishlist */}
            <div className="flex items-center gap-4">
              <Link
                to="/mainCartPage"
                className="relative flex flex-col items-center"
              >
                <BsCart className="text-skin-primary text-xl" />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white w-4 h-4 text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
                <span className="text-[14px] font-body text-gray-800">
                  Cart
                </span>
              </Link>
              <Link
                to="/myWishList"
                className="relative flex flex-col items-center"
              >
                <FaHeart className="text-skin-primary text-xl" />
                <span className="absolute -top-1 left-7 bg-red-500 text-white w-4 h-4 text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
                <span className="text-[14px] font-body text-gray-800">
                  Wishlist
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden mt-4 bg-white shadow-lg rounded-lg 
            p-4 space-y-4 border border-gray-200"
          >
            {/* Searchbar */}
            <div className="overflow-hidden">
              <Searchbar />
            </div>

            {/* User Info */}
            {decoded ? (
              <div className="space-y-2">
                <span className="block text-gray-700 font-medium">
                  Hello, {decoded?.name || decoded?.email?.split("@")[0]}
                </span>
                <Link
                  to="/userProfile"
                  className="block text-sky-600 hover:underline text-sm"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/IsLoggedIn";
                  }}
                  className="block text-red-500 hover:text-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/IsLoggedIn"
                className="block text-sky-600 hover:underline text-sm"
              >
                Sign In / Sign Up
              </Link>
            )}

            {/* Cart Link */}
            <Link
              to="/mainCartPage"
              className="flex items-center gap-2 text-gray-700 hover:text-sky-600 text-sm"
            >
              🛒 Cart <span>({cart?.items?.length || 0})</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/myWishList"
              className="flex items-center gap-2 text-gray-700 hover:text-pink-600 text-sm"
            >
              Wishlist
            </Link>
          </div>
        )}
      </div>

      <div className="h-[1px] bg-black/10" />
    </>
  );
};

export default Header;
