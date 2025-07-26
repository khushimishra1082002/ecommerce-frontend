import React from "react";
import {
  LayoutDashboard,
  Boxes,
  Layers,
  ListOrdered,
  Package,
  ClipboardList,
  Users,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MdPhotoLibrary } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaImage } from "react-icons/fa";

const DashboardSidebar = ({ onClose }) => {
  return (
    <div className="p-4 relative h-full">
      <div
        className="md:hidden absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      >
        <IoClose />
      </div>
      <div className="flex items-center justify-center gap-2">
        <LayoutDashboard className="text-skin-accent_one text-2xl" />
        <span className="font-semibold font-subHeading text-xl ">Megamart</span>
      </div>
      <ul className="text-sm font-heading  py-5 px-1 space-y-1">
        <Link onClick={onClose} to="/adminDashboard/">
          <li className="bg-skin-accent_one text-white rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-4 h-4 " />
              <span>Dashboard</span>
            </div>
          </li>
        </Link>
        <Link onClick={onClose} to="/adminDashboard/productTable">
          <li className="rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <Boxes className="w-4 h-4 text-skin-accent_one" />
              <span>Products</span>
            </div>
          </li>
        </Link>
        <Link onClick={onClose} to="/adminDashboard/categoryTable">
          <li className="rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <Layers className="w-4 h-4 text-skin-accent_one" />
              <span>Categories</span>
            </div>
          </li>
        </Link>
        <Link onClick={onClose} to="/adminDashboard/subcategoryTable">
          <li className="rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <ListOrdered className="w-4 h-4 text-skin-accent_one" />
              <span>Subcategories</span>
            </div>
          </li>
        </Link>
        <Link onClick={onClose} to="/adminDashboard/brandTable">
          <li className="rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <Package className="w-4 h-4 text-skin-accent_one" />
              <span>Brands</span>
            </div>
          </li>
        </Link>
        <Link onClick={onClose} to="/adminDashboard/banner">
          <li className="rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <MdPhotoLibrary className="w-4 h-4 text-skin-accent_one" />
              <span>Banner</span>
            </div>
          </li>
        </Link>

        <Link onClick={onClose} to="/adminDashboard/orderTable">
          <li className="rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <ClipboardList className="w-4 h-4 text-skin-accent_one" />
              <span>Orders</span>
            </div>
          </li>
        </Link>

        <Link onClick={onClose} to="/adminDashboard/posterDashboard">
          <li className="rounded py-2 px-4">
            <div className="flex items-center gap-4">
              <FaImage className="w-4 h-4 text-skin-accent_one" />
              <span>Poster</span>
            </div>
          </li>
        </Link>

        <div className="border border-black/10 w-full my-6"></div>
        <li onClick={onClose} className="rounded py-2 px-4">
          <div className="flex items-center gap-4">
            <HelpCircle className="w-4 h-4 text-skin-accent_one" />
            <span>Help</span>
          </div>
        </li>
        <li onClick={onClose} className="rounded py-2 px-4">
          <div className="flex items-center gap-4">
            <Settings className="w-4 h-4 text-skin-accent_one" />
            <span>Settings</span>
          </div>
        </li>
        <li onClick={onClose} className="rounded py-2 px-4 cursor-pointer">
          <div className="flex items-center gap-4">
            <LogOut
              onClick={() => {
                localStorage.removeItem("token");
                alert("logout successful");
                window.location.href = "/IsLoggedIn";
              }}
              className="w-4 h-4 text-skin-accent_one cursor-pointer"
            />
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
