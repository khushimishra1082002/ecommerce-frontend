import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { FaStar, FaRupeeSign, FaShoppingCart, FaHeart } from "react-icons/fa";
import SimilorProduct from "./SimilorProduct";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import RecommendedProducts from "./RecommendedProducts";
import {
  getSingleProductData,
  postRecentlyViewedProductData,
} from "../services/ProductService";
import { AddProductInCartData } from "../services/cartService";
import { AddProductInWishlistData } from "../services/wishlistService";
import { useParams } from "react-router-dom";
import { decodeToken } from "../utils/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { addToCart, fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const decoded = decodeToken();
  const userId = decoded?.id;

  const [singleProduct, setSingleProduct] = useState<ProductDTO | null>(null);

  const [data, setData] = useState([]);

  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (userId) dispatch(fetchcartProduct(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProductData(productId);
        setSingleProduct(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const postViewed = async () => {
      if (!userId || !singleProduct?._id) return;
      try {
        await postRecentlyViewedProductData({
          userId,
          productId: singleProduct._id,
        });
      } catch (err) {
        console.error("Error posting recently viewed product:", err);
      }
    };
    postViewed();
  }, [singleProduct, userId]);

  const handleAddToCart = () => {
    if (!userId) {
      alert("User not logged in");
      return;
    }
    if (!productId) {
      alert("Invalid product ID");
      return;
    }
    alert("Product added successfully in cart");
    dispatch(
      addToCart({
        userId: userId as string,
        productId: productId as string,
        quantity: 1,
      })
    );
  };

  const handleWishlistProduct = async (productId) => {
    try {
      const res = await AddProductInWishlistData({ userId, productId });
      alert("Product added to wishlist");
      setData(res.data);
    } catch (error) {
      console.error("Error post product:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-50 p-2 shadow">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-4 rounded-md">
            {/* Product Image and Buttons */}
            <div className="flex flex-col items-center">
              <img
                className="w-full object-contain max-h-[300px]"
                src={`${conf.BaseURL}${conf.GetImageUrl}/${singleProduct?.image}`}
                alt={singleProduct?.name}
              />

              <div className="w-full mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded flex justify-center items-center gap-1 font-body"
                >
                  <FaShoppingCart /> ADD TO CART
                </button>

                <button
                  onClick={() => handleWishlistProduct(singleProduct?._id)}
                  className="w-full bg-orange-500 text-white px-2 py-2
                   rounded flex justify-center items-center gap-1 font-body"
                >
                  <FaHeart /> ADD TO WISHLIST
                </button>
              </div>
            </div>

            {/* Product Info and Specs */}
            <div className="lg:col-span-2 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                {singleProduct?.brand && (
                  <span className="font-body text-skin-primary font-semibold">
                    Brand: {singleProduct?.brand}
                  </span>
                )}
                <h3 className="font-body text-xl">{singleProduct?.name}</h3>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-green-500 font-heading font-medium">
                  Extra ₹{singleProduct?.discount} off
                </span>
                <div className="flex items-center gap-1">
                  <FaRupeeSign />
                  <h4 className="text-2xl font-body">{singleProduct?.price}</h4>
                  <span className="text-gray-400 font-body text-sm">
                    inclusive of all taxes
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-2">
                <img className="w-4 h-4" alt="location" />
                <span className="text-gray-500 font-heading text-sm">
                  Deliver to
                </span>
              </div>

              {/* Description */}
              <div className="border border-black/10 rounded">
                <div className="p-4">
                  <h3 className="font-body text-lg font-medium text-gray-800">
                    Product Description
                  </h3>
                </div>
                <div className="bg-black/10 h-[1px]" />
                <div className="p-4 space-y-2">
                  <h3 className="font-heading text-base font-medium">
                    About the item
                  </h3>
                  <p className="font-body text-sm text-gray-700">
                    {singleProduct?.description}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div className="border border-black/10 rounded">
                <div className="p-4">
                  <h3 className="font-body text-lg font-medium text-gray-800">
                    Specifications
                  </h3>
                </div>
                <div className="bg-black/10 h-[1px]" />
                <div className="p-4 space-y-3">
                  <span className="font-heading">General</span>
                  {singleProduct?.attributes &&
                    Object.entries(singleProduct.attributes).map(
                      ([key, value]) => (
                        <div key={key} className="flex gap-4 items-start">
                          <span className="font-body text-gray-700 text-sm">
                            {key}:{" "}
                            {typeof value === "object" && value !== null
                              ? JSON.stringify(value)
                              : String(value)}
                          </span>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar & Recommended Products */}
        </div>

        <div className="">
          <SimilorProduct productId={productId} />
        </div>
        <div className="">
          <RecommendedProducts />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
