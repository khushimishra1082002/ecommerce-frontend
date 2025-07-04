import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaStar } from "react-icons/fa6";
import { get } from "http";
import { getRecommendedProductData } from "../services/ProductService";
import { decodeToken } from "../utils/decodeToken";

const RecommendedProducts = () => {

  const decoded = decodeToken();
    const userId = decoded?.id;

  
  const [data, setData] = useState([]);

  console.log("recommendedproduct", data);

  useEffect(() => {
    const fetchRecommendedProduct = async () => {
      try {
        const res = await getRecommendedProductData(userId);
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchRecommendedProduct();
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
          slidesPerView={5}
          className=""
        >
          {data.map((v, i) => {
            return (
              <SwiperSlide>
                <div
                  className="border rounded-lg p-4 flex flex-col gap-3
                  shadow-sm hover:shadow-md transition duration-200 "
                >
                  <div className="h-52">
                    <img
                    className="w-44 object-contain h-full"
                    src={`http://localhost:5000/api/upload/${v.image}`}
                    alt="banner"
                  />
                  </div>
                  <h4 className="text-sm font-body line-clamp-3">
                   {v.name}
                  </h4>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <div>
                      <span
                        className=" bg-red-500 text-white p-1 text-xs font-body font-medium
         "
                      >
                        {v.discount}% off
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Rs {v.price}</span>
                    <span className=" font-body text-sm text-cyan-500 font-medium">
                      Special offer
                    </span>
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

export default RecommendedProducts;
