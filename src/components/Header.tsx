import React, { useState, useEffect } from "react";
import { FaCartArrowDown, FaTruck, FaTags, FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchWishlistProduct } from "../ReduxToolkit/Slices/WishlistSlice";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { fetchProfile } from "../ReduxToolkit/Slices/ProfileSlice";
import { logout } from "../ReduxToolkit/Slices/AuthSlice";
import { clearCart } from "../ReduxToolkit/Slices/CartSlice";
import { clearWishlist } from "../ReduxToolkit/Slices/WishlistSlice";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log("token", token);

  const { user } = useSelector((state: RootState) => state.profile);

  const { cart } = useSelector((state: RootState) => state.cart);
  console.log();

  const { wishlist } = useSelector((state: RootState) => state.wishlists);

  const userId = user?._id;

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchProfile());
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistProduct(userId));
      dispatch(fetchcartProduct(userId));
    }
  }, [userId, dispatch]);

  const handleLogout = () => {
    localStorage.clear();

    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());

    navigate("/IsLoggedIn");
  };

  const cartCount = cart?.items?.length || 0;
  console.log("cartCount", cartCount);

  // const cartCount = Array.isArray(cart?.items)
  //   ? cart.items.length
  //   : 0;

  const wishlistCount = wishlist?.products?.length || 0;

  return (
    <>
      <div className="bg-skin-secondary px-4 md:px-6 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-[13px] text-gray-400">
            Welcome to our worldwide Megamart
          </span>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaLocationDot className="text-skin-primary text-sm" />
              <span className="text-[13px] text-gray-400">
                Deliver to India
              </span>
            </div>

            <div className="h-[12px] w-[1px] bg-black" />

            <div className="flex items-center gap-1">
              <FaTruck className="text-skin-primary text-sm" />
              <span className="text-[13px] text-gray-400">
                Track Your Order
              </span>
            </div>

            <div className="h-[12px] w-[1px] bg-black" />

            <div className="flex items-center gap-1">
              <FaTags className="text-skin-primary text-sm" />
              <span className="text-[13px] text-gray-400">All Offers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white sticky top-0 z-50 shadow-sm px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <FaCartArrowDown className="text-xl text-skin-primary" />{" "}
            <span className="text-xl font-heading font-extrabold tracking-wider text-skin-primary">
              MegaMart{" "}
            </span>{" "}
          </Link>

          {/* Mobile Toggle */}
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
              {user ? (
                <div className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <MdAccountCircle className="text-xl text-skin-primary" />
                    <span className="text-[11px] text-gray-500">Hello,</span>
                  </div>

                  <span className="text-[13px] font-medium capitalize">
                    {user.fullname || user.email?.split("@")[0]}
                  </span>

                  <div className="absolute top-full left-0 py-2 bg-white shadow-lg rounded w-40 hidden group-hover:block">
                    <Link
                      to="/userProfile"
                      className="block px-4 py-2 text-sm hover:bg-cyan-50"
                    >
                      View Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/IsLoggedIn" className="flex items-center gap-1">
                  <span className="text-sm font-heading">Sign In</span>
                  <LuUser className="text-xl text-skin-primary" />
                </Link>
              )}
            </div>

            {/* Cart & Wishlist */}
            <div className="flex items-center gap-4">
              <Link to="/mainCartPage" className="relative">
                <BsCart className="text-xl text-skin-primary" />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white w-4 h-4 text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>

              <Link to="/myWishList" className="relative">
                <FaHeart className="text-xl text-skin-primary" />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white w-4 h-4 text-xs rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= Mobile Menu ================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white shadow-lg rounded-xl p-4 space-y-5">
            {/* Search */}
            <Searchbar />

            {/* USER SECTION */}
            {user ? (
              <div className="border rounded-lg p-3 space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  Hello, {user.fullname || user.email?.split("@")[0]}
                </p>

                <Link
                  to="/userProfile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm px-3 py-2 rounded hover:bg-gray-100"
                >
                  <MdAccountCircle className="text-lg text-skin-primary" />
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded text-red-600 hover:bg-red-50"
                >
                  <LuUser className="text-lg" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/IsLoggedIn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded bg-skin-primary text-white"
              >
                <LuUser className="text-lg" />
                Sign In / Sign Up
              </Link>
            )}

            <div className="border-t" />

            {/* NAV LINKS */}
            <div className="space-y-2">
              <Link
                to="/mainCartPage"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm px-3 py-2 rounded hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  <BsCart className="text-skin-primary" />
                  Cart
                </span>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </Link>

              <Link
                to="/myWishList"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm px-3 py-2 rounded hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  <FaHeart className="text-skin-primary" />
                  Wishlist
                </span>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
