import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Searchbar from "./Searchbar";
import { FaLocationDot } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaTags } from 'react-icons/fa';
import { LuUser } from "react-icons/lu";
import { BsCart } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <div className=" bg-skin-secondary px-6 py-2 overflow-hidden ">
        <div className="flex justify-between items-center">
          <div>
            <span className=" font-body  text-[13px] text-gray-400
            ">Welcome to our worldwide Megamart</span>
          </div>

          <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
              <FaLocationDot className=" text-skin-primary text-sm "/>
              <span className=" font-body text-[13px] text-gray-400">Deliver to 
                <strong className="font-heading text-gray-500 text-[12px]"> 346646</strong>
              </span>
            </div>
            <div className=" bg-black h-[12px] w-[1px]"></div>
            <div className="flex items-center gap-1">
              <FaTruck className=" text-skin-primary text-sm "/>
              <span className=" font-body text-[13px] text-gray-400">
                Track Your Order
              </span>
            </div>
            <div className=" bg-black h-[12px] w-[1px]"></div>
            <div className="flex items-center gap-1">
              <FaTags className=" text-skin-primary text-sm "/>
              <span className=" font-body text-[13px] text-gray-400">
                All Offers
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[10vh] bg-skin-white_shade flex items-center px-6 sticky top-0 z-50
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
            <Searchbar/>
            <div>
              <div className="flex items-center font-body text-[14px] text-gray-800">
                <LuUser className="text-skin-primary text-lg"/>
                <span>Sign Up</span>/<span>Sign In</span>
              </div>
            </div>
            <div className=" bg-black h-[12px] w-[1px]"></div>
            <div className="flex items-center gap-1">
              <BsCart className=" text-skin-primary text-lg"/>
              <span className=" font-body text-[14px] text-gray-800">
                Cart
              </span>
            </div>
          </div>
          
        </div>
      </div>
      <div className=" bg-black/10 h-[1px]"></div>
    </>
  );
};

export default Header;
