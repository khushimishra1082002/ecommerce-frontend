import React, { useEffect } from "react";
import { decodeToken } from "../utils/decodeToken";
import { DeleteProductFromWishlistData } from "../services/wishlistService";
import { MdDelete } from "react-icons/md";
import conf from "../config/Conf";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchWishlistProduct } from "../ReduxToolkit/Slices/WishlistSlice";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";
import Loader from "../components/Loader";
import DisplayError from "../components/DisplayError";

const Wishlist = () => {
  const navigate = useNavigate();
  const decoded = decodeToken();
  const userId = decoded?.id;

  const dispatch = useDispatch<AppDispatch>();

  const { wishlist, loading, error } = useSelector(
    (state: RootState) => state.wishlists,
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistProduct(userId));
    }
  }, [userId, dispatch]);

  if (loading) return <Loader />;
  if (error) return <DisplayError message={error} />;

  const handleWishlistProductDelete = async (productId: string) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      await DeleteProductFromWishlistData(userId, productId);
      alert("Product Deleted From Wishlist");
      dispatch(fetchWishlistProduct(userId));
    } catch (error) {
      console.error("Error deleting wishlist product:", error);
    }
  };

  // If not logged in
  if (!userId) {
    return (
      <div className="text-center py-10 bg-white w-full">
        <div>
          <img
            className="w-44 m-auto"
            src="https://t3.ftcdn.net/jpg/01/97/57/66/360_F_197576699_QxGIuWnWCJHAMXiSCuVH9YPYtyMwjpJz.jpg"
          />
        </div>
        <h2 className="text-xl font-heading font-medium text-gray-700">
          🔒 Please sign in to view your Wishlist
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-body">
          You need to be logged in to access your wishlist.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <div className=" bg-white rounded-md space-y-6 px-8 py-8">
        {Array.isArray(wishlist?.products) && wishlist.products.length > 0 ? (
          <h2 className="font-body text-xl font-medium text-gray-800 pb-2 flex gap-2 items-center">
            My Wishlist <FaHeart className="text-red-600" />
          </h2>
        ) : (
          <div></div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : Array.isArray(wishlist?.products) &&
          wishlist.products.length > 0 ? (
          wishlist.products.map((item, i) => {
            const product = item?.productId;
            return (
              <div key={product?._id || i}>
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 border rounded-md hover:shadow-md transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="sm:col-span-1 flex justify-center items-center">
                    <img
                      className="w-24 h-24 object-contain rounded border border-gray-200"
                      src={getImageUrl(product?.image[0])}
                      alt={product?.name}
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
                  <div className="sm:col-span-1 flex items-center justify-start sm:justify-center text-gray-700 font-semibold">
                    ₹{product?.price}
                  </div>

                  {/* Remove Button */}
                  <div className="sm:col-span-1 flex items-center justify-start sm:justify-end">
                    <button
                      onClick={() => handleWishlistProductDelete(product?._id)}
                      className="bg-red-500 hover:bg-red-600 flex items-center gap-1 text-white px-4 py-2 rounded transition duration-300 text-sm font-medium"
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
          <div className="text-center py-10 bg-white w-full">
            <div>
              <img
                className="w-60 m-auto"
                src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
              />
            </div>
            <h2 className="text-xl font-medium font-heading text-gray-700">
              ❤️ Your wishlist is empty
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-body">
              Looks like you haven’t added anything yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-sm font-heading my-2
             text-white font-medium py-2 px-4 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
