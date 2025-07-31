import React, { useState, useEffect } from "react";
import { getNewArrivalsProductData } from "../services/ProductService";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import SwiperButtonThree from "../components/SwiperButtonThree";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";

const NewArrivals = () => {
  const [data, setData] = useState<ProductDTO[]>([]);

  console.log("data", data);

  useEffect(() => {
    const fetchnewArivalsProduct = async () => {
      try {
        const res = await getNewArrivalsProductData();
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchnewArivalsProduct();
  }, []);

  return (
    <>
      <div className="bg-white p-4 space-y-4 m-3">
        <div className="">
          <h2 className="font-heading text-lg font-bold ">✨ New Arrivals</h2>
          <p className="text-sm text-gray-500 font-body ">
            Fresh styles & latest picks you won't want to miss.
          </p>
        </div>

        <div className="bg-black/5 w-full h-[1px]"></div>

        <div className="space-y-8 p-4 bg-white my-3">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={16}
            slidesPerView={5}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className=""
            breakpoints={{
              240: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              340: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              440: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 8,
              },
            }}
          >
            <span
              slot="container-start"
              className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200"
            >
              <SwiperButtonThree />
            </span>
            {data.map((v, i) => {
              return (
                <SwiperSlide>
                  <Link to={`${v._id}`}>
                    <div
                      className="flex flex-col  border border-black/10 rounded-md p-2 gap-4
                    shadow "
                    >
                      <div>
                        <span
                          className=" bg-red-500 text-white p-1 text-xs font-body font-medium
         "
                        >
                          New
                        </span>
                      </div>
                      <div className="h-44">
                        <img
                          className="w-36 m-auto h-full object-contain"
                          src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                        />
                      </div>
                      <div className="p-1 flex flex-col gap-1">
                        <span className=" font-heading text-[13px] line-clamp-2">
                          {v.name}
                        </span>
                        <span className=" font-heading text-[15px] font-medium line-clamp-2">
                          Rs.{v.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
