import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import SimilorProduct from "./SimilorProduct";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import { getSingleProductData } from "../services/ProductService";
import { useParams } from "react-router-dom";
import { postRecentlyViewedProductData } from "../services/ProductService";
import { decodeToken } from "../utils/decodeToken";
import RecommendedProducts from "./RecommendedProducts";
import { AddProductInCartData } from "../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { addToCart, updateQuantity } from "../ReduxToolkit/Slices/CartSlice";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";

const ProductDetail = () => {
  const { productId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const decoded = decodeToken();
  const userId = decoded?.id;

  console.log("vvvvvv", userId);

  console.log("userId", userId);

  const [singleProduct, setSingleProduct] = useState(null);

  console.log("singleProduct", singleProduct);

  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  console.log("cart", cart);

  useEffect(() => {
    dispatch(fetchcartProduct(userId));
  }, [dispatch]);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await getSingleProductData(productId);
        setSingleProduct(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchSingleProduct();
  }, [productId]);

  useEffect(() => {
    const postRecentlyViewProduct = async () => {
      if (!userId) return;
      try {
        await postRecentlyViewedProductData({ productId, userId });
      } catch (err) {
        console.error("Error posting recently viewed product:", err);
      }
    };
    postRecentlyViewProduct();
  }, [productId, userId]);

  const handleAddToCart = () => {
    alert("Product added successfully in cart")
    dispatch(addToCart({ userId, productId, quantity: 1 }));
     
  };

  

  return (
    <>
      <div className="bg-gray-50 pt-4">
        <div className="bg-white shadow w-11/12 m-auto  p-8">
          <div className=" grid grid-cols-3 gap-8">
            <div className="flex justify-center items-center">
              <img
                className=""
                src={`http://localhost:5000/api/upload/${singleProduct?.image}`}
                alt="banner"
              />
            </div>
            <div className="space-y-4 col-span-2 h-[60vh] overflow-y-auto">
              <div className="space-y-1 flex flex-col">
                {singleProduct?.brand && (
                  <span
                    className="font-body text-skin-primary
                font-semibold"
                  >
                    Brand : {singleProduct?.brand?.name}
                  </span>
                )}
                <h3 className="font-body text-xl ">{singleProduct?.name}</h3>

                <div className="flex gap-4 items-center">
                  <div
                    className="flex justify-center
                 items-center gap-1 bg-red-500 text-white w-14 p-1 rounded
                 
                "
                  >
                    <span className="font-body text-sm font-medium ">4.5</span>
                    <FaStar className="text-sm" />
                  </div>
                  <div>
                    <span
                      className="font-body
                 text-gray-500 "
                    >
                      396 Ratings & 34 Ratings
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-green-500 font-heading font-medium">
                  Extra ₹{singleProduct?.discount} off
                </span>
                <div className="flex items-center">
                  <FaRupeeSign />
                  <div className="flex gap-1 items-center">
                    <h4 className="text-2xl font-body">
                      {singleProduct?.price}
                    </h4>
                    <span className="text-gray-400 font-body">
                      inclusive of all taxes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZWxsaXBzZSBjeD0iOSIgY3k9IjE0LjQ3OCIgZmlsbD0iI0ZGRTExQiIgcng9IjkiIHJ5PSIzLjUyMiIvPjxwYXRoIGZpbGw9IiMyODc0RjAiIGQ9Ik04LjYwOSA3LjAxYy0xLjA4IDAtMS45NTctLjgyNi0xLjk1Ny0xLjg0NSAwLS40ODkuMjA2LS45NTguNTczLTEuMzA0YTIuMDIgMi4wMiAwIDAgMSAxLjM4NC0uNTRjMS4wOCAwIDEuOTU2LjgyNSAxLjk1NiAxLjg0NCAwIC40OS0uMjA2Ljk1OS0uNTczIDEuMzA1cy0uODY0LjU0LTEuMzgzLjU0ek0zLjEzIDUuMTY1YzAgMy44NzQgNS40NzkgOC45MjIgNS40NzkgOC45MjJzNS40NzgtNS4wNDggNS40NzgtOC45MjJDMTQuMDg3IDIuMzEzIDExLjYzNCAwIDguNjA5IDAgNS41ODMgMCAzLjEzIDIuMzEzIDMuMTMgNS4xNjV6Ii8+PC9nPjwvc3ZnPg==" />
                <span
                  className="text-gray-500 font-heading font-medium
                    text-sm"
                >
                  Deliver to
                </span>
              </div>

              {/* Product Detail */}
              {/* description */}
              <div className=" border border-black/10">
                <div className="p-4">
                  <h3
                    className="font-body text-lg font-medium
                 text-gray-800"
                  >
                    Product Description
                  </h3>
                </div>
                <div className="bg-black/10 w-full h-[1px]"></div>

                <div className=" p-4 ">
                  <div className=" space-y-2 ">
                    <h3 className="font-heading text-base font-medium">
                      About the item
                    </h3>
                    <p className="font-body font-light text-sm">
                      {singleProduct?.description}
                    </p>
                  </div>
                </div>
              </div>
              {/* spaceification */}
              <div className=" border border-black/10">
                <div className="p-4">
                  <h3
                    className="font-body text-lg font-medium
                 text-gray-800"
                  >
                    Specifications
                  </h3>
                </div>
                <div className="bg-black/10 w-full h-[1px]"></div>
                <div className="p-4 space-y-3">
                  <span className="font-heading">General</span>

                  {singleProduct?.attributes &&
                    Object.entries(singleProduct.attributes).map(
                      ([key, value]) => (
                        <div key={key} className="flex gap-4 items-start">
                          <span className="text-sm text-gray-500 font-heading w-40 shrink-0">
                            {key}
                          </span>
                          <span className="font-body text-gray-700 text-sm">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                </div>
              </div>
              {/* Rating Reviews */}
              <div className=" border border-black/10">
                <div className="p-4">
                  <h3
                    className="font-body text-lg font-medium
                 text-gray-800"
                  >
                    Rating & Reviews
                  </h3>
                </div>
                <div className="bg-black/10 w-full h-[1px]"></div>
                <div className="px-4 py-6 flex justify-start gap-4">
                  <div className=" flex flex-col justify-center items-center  ">
                    <div
                      className="text-xl flex gap-1  items-center text-center
                  text-gray-700"
                    >
                      <span className="text-xl font-body">4.2</span>
                      <IoStar />
                    </div>
                    <span
                      className="text-[13px] text-gray-400 font-heading
                  w-36 text-center"
                    >
                      6,832 Ratings & 437 Reviews
                    </span>
                  </div>
                  <div>
                    {/* Progrees bar */}
                    <div>
                      {/* Rating 5 */}
                      <div className="flex items-center gap-2">
                        <div
                          className="text-sm flex gap-1  items-center text-center
                  text-gray-800"
                        >
                          <span className="text-sm font-body">5</span>
                          <IoStar />
                        </div>
                        <div
                          className="bg-gray-200 w-44 h-1 rounded
                       relative overflow-hidden"
                        >
                          <div className="bg-green-500 h-full absolute left-0 top-0 w-48"></div>
                        </div>
                        <span className="font-body text-gray-600 text-xs">
                          4,006
                        </span>
                      </div>
                      {/* Rating 4 */}
                      <div className="flex items-center gap-2">
                        <div
                          className="text-sm flex gap-1  items-center text-center
                  text-gray-800"
                        >
                          <span className="text-sm font-body">4</span>
                          <IoStar />
                        </div>
                        <div
                          className="bg-gray-200 w-44 h-1 rounded
                       relative overflow-hidden"
                        >
                          <div className="bg-green-500 h-full absolute left-0 top-0 w-20"></div>
                        </div>
                        <span className="font-body text-gray-600 text-xs">
                          1,416
                        </span>
                      </div>
                      {/* Rating 3 */}
                      <div className="flex items-center gap-2">
                        <div
                          className="text-sm flex gap-1  items-center text-center
                  text-gray-800"
                        >
                          <span className="text-sm font-body">3</span>
                          <IoStar />
                        </div>
                        <div
                          className="bg-gray-200 w-44 h-1 rounded
                       relative overflow-hidden"
                        >
                          <div className="bg-green-500 h-full absolute left-0 top-0 w-10"></div>
                        </div>
                        <span className="font-body text-gray-600 text-xs">
                          1,416
                        </span>
                      </div>
                      {/* Rating 2 */}
                      <div className="flex items-center gap-2">
                        <div
                          className="text-sm flex gap-1  items-center text-center
                  text-gray-800"
                        >
                          <span className="text-sm font-body">2</span>
                          <IoStar />
                        </div>
                        <div
                          className="bg-gray-200 w-44 h-1 rounded
                       relative overflow-hidden"
                        >
                          <div className="bg-orange-500 h-full absolute left-0 top-0 w-6"></div>
                        </div>
                      </div>
                      {/* Rating 1 */}
                      <div className="flex items-center gap-2">
                        <div
                          className="text-sm flex gap-1  items-center text-center
                  text-gray-800"
                        >
                          <span className="text-sm font-body">1</span>
                          <IoStar />
                        </div>
                        <div
                          className="bg-gray-200 w-44 h-1 rounded
                       relative overflow-hidden"
                        >
                          <div
                            className="bg-yellow-500 h-full absolute left-0 top-0"
                            style={{ width: `${(4.5 / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <SimilorProduct productId={productId} />
        {/* <RecentlyViewedProducts /> */}
        {/* <RecommendedProducts /> */}
      </div>
    </>
  );
};

export default ProductDetail;
