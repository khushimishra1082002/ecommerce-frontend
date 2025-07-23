import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaStar } from "react-icons/fa";
import { getSimilorProductData } from "../services/ProductService";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";

const SimilorProduct = ({ productId }) => {
    const [data, setData] = useState<ProductDTO[]>([]);
  

  console.log("similor", data);

  useEffect(() => {
    const fetchSimilorProduct = async () => {
      try {
        const res = await getSimilorProductData(productId);
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchSimilorProduct();
  }, [productId]);

  return (
    <>
      <div className=" bg-white space-y-4 px-4 py-6 m-3 shadow ">
        <h2 className="font-heading text-lg font-semibold ">
          Similor Products
        </h2>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className=""
          breakpoints={{
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
          {data.map((v, i) => {
            return (
              <SwiperSlide
                className="flex flex-col gap-1 border border-black/10 px-[3px] py-1
           rounded overflow-hidden"
              >
                <div className="w-full aspect-square flex justify-center items-center">
                  <img
                    className="w-44 object-contain h-full"
                    // src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                    alt="banner"
                  />
                </div>
                <div className="flex  flex-col gap-1 p-2 ">
                  <span className=" font-heading text-sm line-clamp-2 ">
                    {v.name}
                  </span>
                  <div className="flex gap-2 items-center">
                    <div
                      className="flex justify-center
                               items-center gap-1 bg-red-500 text-white w-12 p-[1px] rounded
                               
                              "
                    >
                      <span className="font-body text-[12px] font-medium ">
                        4.5
                      </span>
                      <FaStar className="text-[12px]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <span className=" font-heading text-lg font-medium ">
                      Rs {v.price}{" "}
                    </span>
                    <span className="text-sm font-fontOne text-orange-600 font-medium">
                      {v.discount}% off
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

export default SimilorProduct;
