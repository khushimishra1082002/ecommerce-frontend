import React, { useState, useEffect } from "react";
import { getFeaturedProductData } from "../services/ProductService";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper/modules";
import SwiperButtonThree from "../components/SwiperButtonThree";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";
import { getImageUrl } from "../utils/getImageUrl";

const FeaturedProducts = () => {
  const [data, setData] = useState<ProductDTO[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await getFeaturedProductData();
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-white ">
      <div className="bg-white p-4 m-3 space-y-4">
        <div className="">
          <h2 className="font-heading text-lg font-bold ">
            🌟 Featured Products
          </h2>
          <p className="text-sm text-gray-500 font-body  ">
            Handpicked favorites you shouldn’t miss.
          </p>
        </div>

        <div className="w-full bg-black/5 h-[1px] my-3"></div>

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
                      <div className="h-44">
                        <img
                          className="w-36 m-auto h-full object-contain"
                            src={getImageUrl(v.image)}
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
    </div>
  );
};

export default FeaturedProducts;
