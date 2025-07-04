import React from "react";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";
import { FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className=" bg-gray-100 h-80 w-full py-16 flex items-center">
        <div className="w-11/12 m-auto grid grid-cols-5 gap-5">
          <div className=" space-y-2">
            <h3 className=" font-body text-lg font-medium">About Us</h3>
            <p className="text-sm font-body font-light">
              At YourStoreName, we’re committed to bringing you the best
              products at unbeatable prices.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className=" font-body text-lg font-medium">Shop With Us</h3>
            <ul className="space-y-1">
              <li className="text-sm font-body font-light">New Arrivals</li>
              <li className="text-sm font-body font-light">Best Sellers</li>
              <li className="text-sm font-body font-light">
                Deals & Discounts
              </li>
              <li className="text-sm font-body font-light">Gift Cards</li>
              <li className="text-sm font-body font-light">Track Order</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className=" font-body text-lg font-medium">
              {" "}
              Customer Service
            </h3>
            <ul className="space-y-1">
              <li className="text-sm font-body font-light">Help Center</li>
              <li className="text-sm font-body font-light">
                Shipping & Delivery
              </li>
              <li className="text-sm font-body font-light">
                Returns & Exchanges
              </li>
              <li className="text-sm font-body font-light">Payment Options</li>
              <li className="text-sm font-body font-light">Contact Us</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className=" font-body text-lg font-medium">Policies</h3>
            <ul className="space-y-1">
              <li className="text-sm font-body font-light">Privacy Policy</li>
              <li className="text-sm font-body font-light">
                Terms & Conditions
              </li>
              <li className="text-sm font-body font-light">Cookie Policy</li>
              <li className="text-sm font-body font-light">Payment Options</li>
              <li className="text-sm font-body font-light">Accessibility</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className=" font-body text-lg font-medium">Follow Us</h3>
            <ul className="space-y-2">
              <li className="flex gap-2 items-center">
                <IoLogoFacebook className="text-2xl text-[#1877F2]" />{" "}
                <span className="text-sm font-body font-light">Facebook</span>
              </li>
              <li className="flex gap-2 items-center">
                <AiFillInstagram className="text-2xl text-[#E1306C]" />{" "}
                <span className="text-sm font-body font-light">Instagram</span>
              </li>
              <li className="flex gap-2 items-center">
                <IoLogoYoutube className="text-xl text-[#FF0000]" />{" "}
                <span className="text-sm font-body font-light">YouTube</span>
              </li>
              <li className="flex gap-2 items-center">
                <FaTwitterSquare className="text-xl text-[#1DA1F2]" />{" "}
                <span className="text-sm font-body font-light">Twitter</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
