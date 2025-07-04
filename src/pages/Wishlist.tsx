import React, { useEffect, useState } from "react";
import { decodeToken } from "../utils/decodeToken";
import {
  DeleteProductFromWishlistData,
  getWishlistData,
} from "../services/wishlistService";

const Wishlist = () => {
  const [data, setData] = useState([]);

  const decoded = decodeToken();
  const userId = decoded?.id;

  
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

  const handleWishlistProductDelete = async (productId) => {
    try {
      console.log("Calling DELETE with:", userId, productId);
      await DeleteProductFromWishlistData(userId, productId);
      alert("Product Deleted From wishlist");
      fetchData(); 
    } catch (error) {
      console.error("Error deleting wishlist product:", error);
    }
  };

  return (
    <div className="bg-gray-50 p-4">
      <div className="bg-white p-6 shadow space-y-7">
        <h2 className="font-heading text-xl font-medium">My wishlist</h2>
        {data.map((item, i) => {
          const product = item.productId;
          return (
            <div key={i} className="grid grid-cols-6 gap-5">
              <div className="border border-black/10 p-2 rounded flex justify-center items-center">
                <img
                  className="w-28"
                  src={`http://localhost:5000/api/upload/${product.image[0]}`}
                  alt="product"
                />
              </div>
              <div className="col-span-2 py-1 space-y-2 flex flex-col justify-center">
                <span className="text-green-500 font-body font-medium">In stock</span>
                <h4 className="font-heading text-sm">{product.name}</h4>
              </div>
              <div className="flex items-center">
                <span className="font-body">Rs {product.price}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleWishlistProductDelete(product._id)}
                  className="bg-green-500 text-white font-medium p-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
