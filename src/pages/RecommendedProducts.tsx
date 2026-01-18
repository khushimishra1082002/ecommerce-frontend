import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaStar } from "react-icons/fa6";
import { getRecommendedProductData } from "../services/ProductService";
import { decodeToken } from "../utils/decodeToken";
import { Link, useNavigate } from "react-router-dom";
import SwiperButtonThree from "../components/SwiperButtonThree";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";

const RecommendedProducts = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;
  const navigate  =  useNavigate()

  const [data, setData] = useState<ProductDTO[]>([]);

  console.log("data", data);

  useEffect(() => {
    const fetchRecommendedProduct = async () => {
      try {
        const res = await getRecommendedProductData(userId);
        console.log("Recommended Products Response:", res);
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (userId) fetchRecommendedProduct();
  }, [userId]);

  return (
  <>
    {userId && data.length > 0 && (
      <div className="bg-white p-4 space-y-4 m-3">
        <div className="flex flex-col">
          <h2 className="font-heading text-lg font-bold ">
            🎯 Recommended For You
          </h2>
          <span className="text-sm text-gray-500 font-body ">
            Personalized picks based on your interests
          </span>
          <div className="w-full bg-gray-200 h-[1px] my-3"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={12}
          slidesPerView={5}
          breakpoints={{
            240: { slidesPerView: 1, spaceBetween: 6 },
            340: { slidesPerView: 2, spaceBetween: 6 },
            440: { slidesPerView: 2, spaceBetween: 6 },
            640: { slidesPerView: 3, spaceBetween: 6 },
            768: { slidesPerView: 4, spaceBetween: 6 },
            1024: { slidesPerView: 5, spaceBetween: 6 },
          }}
        >
          <span
            slot="container-start"
            className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200"
          >
            <SwiperButtonThree />
          </span>

          {data.map((v, i) => (
            <SwiperSlide key={v._id || i} onClick={() => navigate(`/${v._id}`)}>
              <div className="border rounded-lg flex flex-col gap-3 hover:shadow-md
               transition duration-200 py-1 shadow cursor-pointer">
                <Link to={`${v._id}`} className="space-y-1">
                  <div className="h-44 p-2">
                    <img
                      className="h-full m-auto object-contain"
                      src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                      alt={v.name}
                    />
                  </div>

                  <div className="px-3 space-y-2">
                    <div>
                      <span className="bg-red-500 rounded text-white p-1 text-xs font-body font-medium">
                        {v.discount}% off
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-[12px] font-heading line-clamp-2">
                        {v.name}
                      </h4>
                      <span className="text-base font-heading font-medium">
                        Rs {v.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )}
  </>
);

};

export default RecommendedProducts;
