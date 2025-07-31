import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import SwiperButtonThree from "./SwiperButtonThree";
import { BannerDTO } from "../types/banner";
import conf from "../config/Conf";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchAllBanners } from "../ReduxToolkit/Slices/BannerSlice";

const HeroSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { banners, loading, error } = useSelector(
    (state: RootState) => state.banner
  );

  const [data, setData] = useState<BannerDTO[]>([]);

  useEffect(() => {
    dispatch(fetchAllBanners());
  }, [dispatch]);

  useEffect(() => {
    // Filter banners when Redux store updates
    if (banners && banners.length > 0) {
      const heroBanners = banners.filter(
        (item) => item.location === "herosection"
      );
      setData(heroBanners);
    }
  }, [banners]);

  return (
    <div className="overflow-hidden px-3">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="overflow-hidden"
      >
        <span
          slot="container-start"
          className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200"
        >
          <SwiperButtonThree />
        </span>

        {data.map((v, i) => (
          <SwiperSlide key={i}>
            <div className="h-64">
              <img
                className="w-full h-full object-cover"
                src={`${conf.BaseURL}${conf.GetImageUrl}/${v.image}`}
                alt={`Banner ${i}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
