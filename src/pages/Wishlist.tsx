import React, { useEffect, useState } from "react";
import { decodeToken } from "../utils/decodeToken";
import {
  DeleteProductFromWishlistData,
} from "../services/wishlistService";
import { MdDelete } from "react-icons/md";
import conf from "../config/Conf";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchWishlistProduct } from "../ReduxToolkit/Slices/WishlistSlice";
import { FaHeart } from "react-icons/fa6";

const Wishlist = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;

  const dispatch = useDispatch<AppDispatch>();

  const { wishlist, loading, error } = useSelector(
    (state: RootState) => state.wishlists
  );
  console.log("wishlist", wishlist);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistProduct(userId));
    }
  }, [userId]);

  const handleWishlistProductDelete = async (productId) => {
    try {
      console.log("Calling DELETE with:", userId, productId);
      await DeleteProductFromWishlistData(userId, productId);
      alert("Product Deleted From wishlist");
      if (userId) {
        dispatch(fetchWishlistProduct(userId));
      }
    } catch (error) {
      console.error("Error deleting wishlist product:", error);
    }
  };

  return (
    <div className="bg-gray-50  p-4">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-md space-y-6">
        <h2 className="font-body text-xl font-medium text-gray-800 border-b pb-2
        flex gap-2 items-center ">
        
          My Wishlist <FaHeart className="text-red-600"/>
        </h2>

        {wishlist?.products?.length ? (
          wishlist.products.map((item, i) => {
            const product = item?.productId;
            return (
              <div key={product?._id}>
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 border rounded-md hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="sm:col-span-1 flex justify-center items-center">
                    <img
                      className="w-24 h-24 object-contain rounded border border-gray-200"
                      src={`${conf.BaseURL}${conf.GetImageUrl}/${product?.image[0]}`}
                     
                    />
                  </div>

                  {/* Product Details */}
                  <div className="sm:col-span-3 flex flex-col justify-center space-y-1">
                    <span className="text-green-600 text-sm font-medium">
                      In stock
                    </span>
                    <h4 className="font-heading text-[13px] line-clamp-2 text-gray-800">
                      {product?.name}
                    </h4>
                   
                  </div>

                  {/* Product Price */}
                  <div
                    className="sm:col-span-1 flex items-center
             justify-start sm:justify-center text-gray-700 font-semibold"
                  >
                    ₹{product?.price}
                  </div>

                  {/* Remove Button */}
                  <div className="sm:col-span-1 flex items-center justify-start sm:justify-end">
                    <button
                      onClick={() => handleWishlistProductDelete(product?._id)}
                      className="bg-red-500 hover:bg-red-600
                flex items-center gap-1 text-white px-4 py-2 rounded transition duration-300 text-sm font-medium"
                    >
                      <MdDelete />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products in wishlist</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
