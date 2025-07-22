import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { decodeToken } from "../utils/decodeToken";

const DashboardHeader = ({onMenuClick }) => {
  const decoded = decodeToken();
  return (
    <div className="shadow p-4 h-14 flex items-center justify-between
     w-full sticky top-0 z-20 bg-white">
      <div className="flex gap-2 items-center">
        <div
          className="bg-skin-accent_one text-white rounded-md flex justify-center items-center p-2 md:hidden cursor-pointer"
          onClick={onMenuClick}
        >
          <FiMenu />
        </div>
        <span className="font-heading font-medium text-lg">Dashboard</span>
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
        <div className="relative">
          <GoBell className="text-gray-600 text-xl" />
          <div
            className="absolute -top-2 left-2 h-4 w-4 rounded-full
           bg-skin-accent_one text-white flex justify-center items-center"
          >
            <span className="text-[10px] leading-none">0</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
              alt="avatar"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-2 right-0 z-10 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <span className="font-heading text-gray-600 text-sm">{decoded?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
