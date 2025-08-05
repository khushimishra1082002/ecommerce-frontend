import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getSimilorProductData } from "../services/ProductService";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";

const SimilorProduct = ({ productId }) => {
  const [data, setData] = useState<ProductDTO[]>([]);

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
      {
        data.length > 0 && 
        <div className=" bg-white space-y-4 px-4 py-6 m-3 shadow ">
        <h2 className="font-heading text-lg font-semibold">Related Products</h2>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={5}
         
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className=""
          breakpoints={{
            240: {
            slidesPerView: 1,
            spaceBetween: 6,
          },
          340: {
            slidesPerView: 1,
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
          {data.map((v, i) => {
            return (
              <SwiperSlide
                className="flex flex-col gap-1 border border-black/10 px-[3px] py-1
           rounded overflow-hidden"
              >
                <div className="w-full aspect-square flex justify-center items-center">
                  <img
                    className="w-44 object-contain h-full"
                    src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                    alt="banner"
                  />
                </div>
                <div className="flex  flex-col gap-1 p-2 ">
                  <span className=" font-heading text-[13px] line-clamp-2 ">
                    {v.name}
                  </span>

                  <div className="flex items-center gap-6 ">
                    <span className=" font-heading text-base font-medium ">
                      Rs {v.price}{" "}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      }
    </>
  );
};

export default SimilorProduct;
