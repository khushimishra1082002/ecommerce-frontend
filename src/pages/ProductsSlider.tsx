import React, { useState, useEffect } from "react";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { decodeToken } from "../utils/decodeToken";
import { getFilterProductsData } from "../services/ProductService";
import SwiperButton from "../components/SwiperButton";
import { ProductDTO } from "../types/product";
import {
  fetchWishlistProduct,
  addToWishlist,
} from "../ReduxToolkit/Slices/WishlistSlice";
import { getImageUrl } from "../utils/getImageUrl";
import Loader from "../components/Loader";
import DisplayError from "../components/DisplayError";

interface ProductSliderProps {
  title: string;
  filterQuery: Record<string, any>;
}
const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  filterQuery,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const decoded = decodeToken();
  const userId = decoded?.id;

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { wishlist } = useSelector((state: RootState) => state.wishlists);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFilterProductsData(filterQuery);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filterQuery]);

  // 🔹 Fetch wishlist
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistProduct(userId));
    }
  }, [userId, dispatch]);

  const handleWishlistProduct = (productId: string, isWishlisted: boolean) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (isWishlisted) {
      alert("Product already in wishlist");
      return;
    }

    dispatch(addToWishlist({ userId, productId }))
      .unwrap()
      .then(() => {
        alert("Product added to wishlist");
        dispatch(fetchWishlistProduct(userId));
      })
      .catch(() => {
        alert("Failed to add product to wishlist");
      });
  };

  if (loading) return <Loader />;
  if (error) return <DisplayError message={error} />;

  return (
    <>
      <div className="bg-white space-y-4 px-4 py-6 m-3">
        <Swiper
          modules={[Navigation, A11y]}
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
              <h2 className="font-heading text-base md:text-lg font-bold">
                {title}
              </h2>
            </div>

            <SwiperButton />
          </span>

          {products.map((v, i) => {
            const isWishlisted = !!wishlist?.products?.some((p) => {
              const id = p?.productId?._id || p?.productId || p?._id;
              return id === v._id;
            });

            return (
              <SwiperSlide
                key={i}
                className=" cursor-pointer flex flex-col gap-1 border border-black/10 px-[3px] py-1 rounded overflow-hidden"
              >
                <div>
                  <div className="relative">
                    <div className="w-full aspect-square flex justify-center items-center">
                      <img
                        className="h-40 m-auto w-full object-contain"
                        src={getImageUrl(v.image)}
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
                        onClick={() =>
                          handleWishlistProduct(v._id, isWishlisted)
                        }
                        className="absolute top-3 right-3 text-xl"
                        title={
                          isWishlisted
                            ? "Already in Wishlist"
                            : "Add to Wishlist"
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
