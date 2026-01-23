import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaShoppingCart, FaHeart } from "react-icons/fa";
import SimilorProduct from "./SimilorProduct";
import RecommendedProducts from "./RecommendedProducts";
import {
  getSingleProductData,
  postRecentlyViewedProductData,
} from "../services/ProductService";
import { AddProductInWishlistData } from "../services/wishlistService";
import { useNavigate, useParams } from "react-router-dom";
import { decodeToken } from "../utils/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { addToCart, fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";
import {
  addToWishlist,
  fetchWishlistProduct,
} from "../ReduxToolkit/Slices/WishlistSlice";
import { getImageUrl } from "../utils/getImageUrl";
import Loader from "../components/Loader";
import DisplayError from "../components/DisplayError";

const ProductDetail = () => {
  const navigate = useNavigate();

  const decoded = decodeToken();
  const userId = decoded?.id;

  const dispatch = useDispatch<AppDispatch>();

  const { wishlist } = useSelector((state: RootState) => state.wishlists);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistProduct(userId));
    }
  }, [userId, dispatch]);

  const { productId } = useParams();

  const [singleProduct, setSingleProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchcartProduct(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getSingleProductData(productId);
        setSingleProduct(res);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
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
      }),
    );
    navigate("/mainCartPage");
  };

  const handleWishlistProduct = (productId: string) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    const alreadyInWishlist = wishlist?.products?.some(
      (item: any) => item?.productId?._id === productId,
    );

    if (alreadyInWishlist) {
      alert("Product already in wishlist ❤️");
      return;
    }

    dispatch(addToWishlist({ userId, productId }))
      .unwrap()
      .then(() => {
        alert("Product added to wishlist.");
        dispatch(fetchWishlistProduct(userId));
      })
      .catch((error) => {
        console.error("Wishlist error:", error);
        alert("Failed to add product to wishlist.");
      });
  };

  const alreadyInWishlist = wishlist?.products?.some(
    (item: any) => item?.productId?._id === singleProduct?._id,
  );

  if (loading) return <Loader />;
  if (error) return <DisplayError message={error} />;

  return (
    <>
      <div className="bg-gray-50 p-2 shadow">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-4 rounded-md">
            <div className="flex flex-col items-center">
              <img
                className="w-full object-contain max-h-[55vh]"
                src={getImageUrl(singleProduct?.image)}
                alt={singleProduct?.name}
              />
              <div className="w-full flex flex-col gap-2 my-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-500 text-white px-4 py-2
                   rounded flex justify-center items-center gap-1 font-body text-sm"
                >
                  <FaShoppingCart /> ADD TO CART
                </button>

                <button
                  disabled={alreadyInWishlist || !singleProduct?._id} 
                  onClick={() => {
                    if (singleProduct?._id)
                      handleWishlistProduct(singleProduct._id);
                  }}
                  className={`w-full px-2 py-2 border rounded flex justify-center items-center gap-1 text-sm
                 ${alreadyInWishlist ? "bg-gray-100 cursor-not-allowed" : "border-blue-500"}
  `}
                >
                  <FaHeart className="text-red-600" />
                  {alreadyInWishlist ? "IN WISHLIST" : "ADD TO WISHLIST"}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6 max-h-[75vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                {singleProduct?.brand?.name && (
                  <span className="font-body text-skin-primary font-semibold">
                    Brand: {singleProduct.brand.name}
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
                  <p className="font-heading text-[13px] text-gray-700 font-light">
                    {singleProduct?.description}
                  </p>
                </div>
              </div>

              {Array.isArray(singleProduct?.attributes) &&
                singleProduct.attributes.length > 0 && (
                  <div className="border border-black/10 rounded">
                    <div className="p-4">
                      <h3 className="font-body text-lg font-medium text-gray-800">
                        Specifications
                      </h3>
                    </div>
                    <div className="bg-black/10 h-[1px]" />
                    <div className="p-4 space-y-3">
                      {singleProduct.attributes.map((attr, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <span className="font-body text-gray-700 text-sm">
                            {attr.key}: {attr.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
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
