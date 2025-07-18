import React, {useState, useEffect } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Searchbar from "./Searchbar";
import { FaLocationDot } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { decodeToken } from "../utils/decodeToken";
import { MdPerson, MdAccountCircle } from "react-icons/md";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { getWishlistData } from "../services/wishlistService";

const Header = () => {
  const decoded = decodeToken();

  console.log("decoded", decoded?.name);

  const userId = decoded?.id;

  console.log("decodeUser", userId);

  const dispatch = useDispatch<AppDispatch>();

  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  console.log("cart", cart);

  useEffect(() => {
    dispatch(fetchcartProduct(userId));
  }, [dispatch]);


   const [data, setData] = useState([]);

   console.log("khushi",data);
   
  
    
    const fetchData = async () => {
      try {
        const res = await getWishlistData(userId);
        console.log("Wishlist API response:", res);
        setData(res.products);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
  
    useEffect(() => {
      if (userId) {
        fetchData();
      }
    }, [userId]);
  

  return (
    <>
      <div className=" bg-skin-secondary px-6 py-2 overflow-hidden ">
        <div className="flex justify-between items-center">
          <div>
            <span
              className=" font-body  text-[13px] text-gray-400
            "
            >
              Welcome to our worldwide Megamart
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaLocationDot className=" text-skin-primary text-sm " />
              <span className=" font-body text-[13px] text-gray-400">
                Deliver to
                <strong className="font-heading text-gray-500 text-[12px]">
                  {" "}
                  346646
                </strong>
              </span>
            </div>
            <div className=" bg-black h-[12px] w-[1px]"></div>
            <div className="flex items-center gap-1">
              <FaTruck className=" text-skin-primary text-sm " />
              <span className=" font-body text-[13px] text-gray-400">
                Track Your Order
              </span>
            </div>
            <div className=" bg-black h-[12px] w-[1px]"></div>
            <div className="flex items-center gap-1">
              <FaTags className=" text-skin-primary text-sm " />
              <span className=" font-body text-[13px] text-gray-400">
                All Offers
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[12vh] bg-skin-white_shade flex items-center px-6 sticky top-0 z-50 

      "
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <div className="flex gap-1 items-center">
            <FaCartArrowDown className=" text-xl text-skin-primary" />
            <span className="text-skin-primary font-extrabold font-heading text-xl tracking-wider">
              MegaMart
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Searchbar />
            <div>
              <div className="relative group">
                {decoded ? (
                  <div className="flex flex-col items-start cursor-pointer group relative">
                    <div className="flex items-center gap-1">
                      <MdAccountCircle className="text-skin-primary text-xl" />
                      <span className="text-[11px] text-gray-500">Hello,</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] font-heading text-gray-800 capitalize">
                        {decoded?.name ||
                          decoded?.email?.split("@")[0] ||
                          "User"}
                      </span>
                    </div>

                    {/* Dropdown on hover */}
                    <div className="absolute top-full left-0 py-2 bg-white shadow-lg rounded w-40 hidden group-hover:block z-50">
                      <Link
                        to="/userProfile"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-cyan-50
                        font-body"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          window.location.href = "/IsLoggedIn";
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600
                       hover:bg-red-50 font-body"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/IsLoggedIn"
                    className="flex flex-col items-start hover:underline"
                  >
                    <span className="text-[11px] text-gray-500">Hello,</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-heading text-gray-800">
                        Sign Up / Sign In
                      </span>
                      <LuUser className="text-skin-primary text-xl" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
            <div className=" bg-black h-[12px] w-[1px]"></div>
            <div className="flex  items-center gap-3">
              <Link to="/mainCartPage" className="flex flex-col items-center gap-1">
                <div className="relative">
                  <BsCart className="text-skin-primary text-xl" />

                  {/* 🔴 Cart Count Badge */}
                  <span className="absolute -top-1 -right-1
                   bg-red-500 text-white w-4 h-4 text-xs flex justify-center items-center rounded-full font-bold">
                    {cart?.items.length}
                  </span>
                </div>

                <span className="font-body text-[14px] text-gray-800">
                  Cart
                </span>
              </Link>


              <Link to="/myWishList" className="flex flex-col items-center gap-1">
                <div className="relative">
                  <FaHeart className="text-skin-primary text-xl" />

                  {/* 🔴 Cart Count Badge */}
                  <span className="absolute -top-1 -right-2
                   bg-red-500 text-white w-4 h-4 text-xs flex justify-center items-center rounded-full font-bold">
                    {data.length}
                  </span>
                </div>

                <span className="font-body text-[14px] text-gray-800">
                  Wishlist
                </span>
              </Link>

             
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-black/10 h-[1px]"></div>
    </>
  );
};

export default Header;
