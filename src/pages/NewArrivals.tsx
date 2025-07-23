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
        <div className="flex flex-col">
          <h2 className="font-heading text-lg font-semibold ">New Arrivals</h2>
          <span className="font-body text-sm font-light">
            Products You Absolutely Can't miss{" "}
          </span>
          <div className="w-full bg-black/15 h-[1px] my-3"></div>
        </div>

        <div className="space-y-8 p-4 bg-white my-3">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={14}
            slidesPerView={6}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className=""
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
              className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200"
            >
              <SwiperButtonThree />
            </span>
            {data.map((v, i) => {
              return (
                <SwiperSlide>
                  <Link to={`${v._id}`}>
                    <div className="flex flex-col  border border-black/10 rounded-md p-2 gap-4 ">
                      <div>
                        <span
                          className=" bg-red-500 text-white p-1 text-xs font-body font-medium
         "
                        >
                          New
                        </span>
                      </div>
                      <div className="h-52">
                        <img
                          className="w-48 h-full object-contain"
                           src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                        />
                      </div>
                      <span className=" font-heading text-sm line-clamp-2">
                        {v.name}
                      </span>
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
