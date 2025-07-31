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
import { getFilterProductsData } from "../services/ProductService";
import SwiperButton from "../components/SwiperButton";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";
import { fetchWishlistProduct } from "../ReduxToolkit/Slices/WishlistSlice";
import { addToWishlist } from "../ReduxToolkit/Slices/WishlistSlice";

const ProductSlider = ({ title, filterQuery }) => {
  const dispatch = useDispatch<AppDispatch>();
  const decoded = decodeToken();
  const userId = decoded?.id;
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const { wishlist, loading, error } = useSelector(
    (state: RootState) => state.wishlists
  );

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const data = await getFilterProductsData(filterQuery);
        console.log("data", data);
        setProducts(data);
      } catch (err) {
        console.error(" Failed to fetch filtered products", err);
      }
    };
    fetchFilteredProducts();
  }, [filterQuery]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistProduct(userId));
    }
  }, [userId]);

  const handleWishlistProduct = (productId: string) => {
    if (!userId) return;
    const alreadyInWishlist = wishlist?.products?.some((item) => {
      const id = item?.productId?._id || item?.productId;
      return id === productId;
    });

    if (alreadyInWishlist) {
      alert("Product is already in your wishlist.");
      return;
    }

    dispatch(addToWishlist({ userId, productId }))
      .unwrap()
      .then(() => {
        alert("Product added to wishlist.");
        dispatch(fetchWishlistProduct(userId));
      })
      .catch((error) => {
        alert("Failed to add product to wishlist.");
        console.error("Wishlist error:", error);
      });
    
  };

  return (
    <>
      <div className="bg-white space-y-4 px-4 py-6 m-3">
        {/* Swiper with slides + buttons */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={6}
          className="space-y-5"
          breakpoints={{
            240: {
              slidesPerView: 1,
              spaceBetween: 6,
            },
            340: {
              slidesPerView: 2,
              spaceBetween: 6,
            },
            440: {
              slidesPerView: 2,
              spaceBetween: 6,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 6,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 6,
            },
          }}
        >
          <span
            slot="container-start"
            className="w-full flex justify-between gap-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-sm sm:text-base md:text-lg font-bold">
                {title}
              </h2>
            </div>

            <SwiperButton />
          </span>

          {products.map((v, i) => {
            const isWishlisted = wishlist?.products?.some((p) => {
              const id = p?.productId?._id || p?.productId || p?._id;
              return id === v._id;
            });

            return (
              <SwiperSlide
                key={i}
                className="flex flex-col gap-1 border border-black/10 px-[3px] py-1 rounded overflow-hidden"
              >
                <div className="relative">
                  <div className="w-full aspect-square flex justify-center items-center">
                    <img
                      className="h-40 m-auto w-full object-contain"
                      src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                      alt="product"
                    />
                  </div>

                  <Link to={`${v._id}`}>
                    <div className="flex flex-col gap-1 px-1 py-2">
                      <span className="font-heading text-[13px] line-clamp-2">
                        {v.name}
                      </span>
                      <span className="font-heading text-base">
                        Rs {v.price}
                      </span>
                    </div>
                  </Link>

                  {userId && (
                    <button
                      onClick={() => handleWishlistProduct(v._id)}
                      className="absolute top-3 right-3 text-xl"
                      title={
                        isWishlisted ? "Already in Wishlist" : "Add to Wishlist"
                      }
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-red-600" />
                      ) : (
                        <FaRegHeart className="text-gray-500" />
                      )}
                    </button>
                  )}
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
