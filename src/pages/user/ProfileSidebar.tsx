import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaHistory,
  FaShoppingCart,
  FaHeart,
  FaAddressCard,
  FaSignOutAlt,
  FaBookmark
} from "react-icons/fa";

const ProfileSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaUser />, label: "Profile", route: "/userProfile" },
    { icon: <FaBoxOpen />, label: "My Orders", route: "/myOrders" },
    { icon: <FaShoppingCart />, label: "My Cart", route: "/mainCartPage" },
     {
      icon: <FaBookmark />,
      label: "Saved for Later",
      route: "/saveForLetterProduct",
    },
    { icon: <FaHeart />, label: "Wishlist", route: "/myWishList" },
    { icon: <FaSignOutAlt />, label: "Logout", route: "/logout" },
  ];

  return (
    <div className="">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.route)}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition cursor-pointer"
        >
          <div className="text-orange-600 text-lg">{item.icon}</div>
          <div className="text-sm text-gray-800 font-body">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
