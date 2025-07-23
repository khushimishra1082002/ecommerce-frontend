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
import { Link } from "react-router-dom";
import SwiperButtonThree from "../components/SwiperButtonThree";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";

const RecommendedProducts = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;

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
      <div className="bg-white p-4 space-y-4 m-3">
        <div className="flex flex-col">
          <h2 className="font-heading text-lg font-semibold ">
            Recommended For You
          </h2>
          <div className="w-full bg-black/15 h-[1px] my-3"></div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={6}
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
          className=""
        >
          <span
            slot="container-start"
            className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200"
          >
            <SwiperButtonThree />
          </span>
          {data?.map((v, i) => {
            return (
              <SwiperSlide>
                <div
                  className="border rounded-lg p-4 flex flex-col gap-3
                  shadow-sm hover:shadow-md transition duration-200 "
                >
                  <Link to={`${v._id}`} className="space-y-1">
                    <div className="">
                      <img
                        className="w-44 m-auto object-contain h-44"
                    src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                        
                        alt="banner"
                      />
                    </div>
                    <h4 className="text-sm font-body line-clamp-2">{v.name}</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <span
                          className=" bg-red-500 rounded text-white p-1 text-xs font-body font-medium
         "
                        >
                          {v.discount}% off
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-heading">Rs {v.price}</span>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default RecommendedProducts;
