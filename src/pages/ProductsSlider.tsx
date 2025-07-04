import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchAllProducts } from "../ReduxToolkit/Slices/ProductSlice";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { AddProductInWishlistData } from "../services/wishlistService";
import { decodeToken } from "../utils/decodeToken";

const ProductSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [wishlisted, setWishlisted] = useState(false);

  const { products, loading, error } = useSelector(
    (state: RootState) => state.allproducts
  );
  console.log("products", products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const [data, setData] = useState([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);


  console.log("data", data);

  const decoded = decodeToken();
  const userId = decoded?.id;

  console.log("decodeUser", userId);

  const handleWishlistProduct = async (productId) => {
    setWishlisted(!wishlisted);
    try {
      const res = await AddProductInWishlistData({ userId, productId });
      alert("Product added in wishlist");
      setData(res.data);
    } catch (error) {
      console.error("Error post product:", error);
    }
  };

  return (
    <>
      <div className=" bg-white space-y-4 px-4 py-6 m-3  ">
        <h2 className="font-heading text-lg font-semibold ">
          Top delas with great offer 20% off
        </h2>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={6}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className=""
        >
          {products.map((v, i) => {
            return (
              <SwiperSlide
                className="flex flex-col gap-1 border border-black/10 px-[3px] py-1
           rounded overflow-hidden"
              >
                <div>
                  <div className="w-full aspect-square flex justify-center items-center">
                    <img
                      className="h-full w-full object-contain"
                      src={`http://localhost:5000/api/upload/${v.image}`}
                      alt="product"
                    />
                  </div>
                  <Link to={`${v._id}`}>
                    <div className="flex  flex-col gap-1 px-1 py-2 ">
                      <span className=" font-heading text-sm line-clamp-2 ">
                        {v.name}
                      </span>
                      <span className=" font-heading text-base ">
                        {v.price}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleWishlistProduct(v._id)}
                    className={`absolute top-3 right-3 text-xl ${
                      wishlistedProducts.includes(v._id)
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                    title={
                      wishlistedProducts.includes(v._id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }
                  >
                    {wishlistedProducts.includes(v._id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProductSlider;
