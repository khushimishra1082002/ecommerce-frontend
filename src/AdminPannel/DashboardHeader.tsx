import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { decodeToken } from "../utils/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { logout } from "../ReduxToolkit/Slices/AuthSlice";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logoutProfile } from "../ReduxToolkit/Slices/ProfileSlice";

const DashboardHeader = ({ onMenuClick }) => {
  const dispatch = useDispatch<AppDispatch>();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/adminDashboard":
        return "Dashboard";
      case "/adminDashboard/productTable":
        return "Products";
      case "/adminDashboard/categoryTable":
        return "Categories";
      case "/adminDashboard/subcategoryTable":
        return "Subcategories";
      case "/adminDashboard/brandTable":
        return "Brands";
      case "/adminDashboard/banner":
        return "Banner";
      case "/adminDashboard/posterDashboard":
        return "Poster";
      case "/adminDashboard/orderTable":
        return "Orders";
      case "/adminDashboard/notifications":
        return "Notifications";
      default:
        return "Dashboard";
    }
  };

  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  return (
    <div
      className="shadow p-4 h-14 flex items-center justify-between
     w-full sticky top-0 z-20 bg-white"
    >
      <div className="flex gap-2 items-center">
        <div
          className="bg-skin-accent_one text-white rounded-md flex justify-center items-center p-2 md:hidden cursor-pointer"
          onClick={onMenuClick}
        >
          <FiMenu />
        </div>
        <span className="font-heading font-medium text-lg">{pageTitle}</span>
      </div>

      <div className="flex gap-6 items-center">
        <div className="relative">
          <FaSearch
            className="absolute top-1/2 left-2 -translate-y-1/2 text-skin-accent_one
                 text-sm"
          />
          <input
            className="border border-gray-800/10 rounded-sm font-heading text-sm w-60
            sm:w-80  md:w-80 lg:w-96 pl-8 px-2
                  h-10 text-[13px]"
            type="text"
            placeholder="Search product categories and more"
          />
        </div>

        <div>
          <Link to="/adminDashboard/notifications">
            <div className="relative">
              <GoBell className="text-gray-600 text-xl" />
              <div
                className="absolute -top-1 left-2 h-3 w-3 rounded-full
                bg-skin-accent_one text-white flex justify-center items-center"
              >
                <span className="text-[10px] leading-none">0</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="relative group">
          <div className="flex gap-2 items-center cursor-pointer">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                alt="avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-0 z-10 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>

          {/* Dropdown on hover */}
          <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded shadow-lg w-36 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <button
              onClick={() => {
                dispatch(logout());
                dispatch(logoutProfile());
                window.location.href = "/AdminLogin"
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
              font-medium flex gap-1 items-center"
            >
              <IoMdLogOut className="text-xl text-red-600" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
