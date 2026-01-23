import React, { useEffect } from "react";
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
import conf from "../config/Conf";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchAllBanners } from "../ReduxToolkit/Slices/BannerSlice";
import Loader from "./Loader";
import DisplayError from "./DisplayError";

const HeroSection = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { banners, loading, error } = useSelector(
    (state: RootState) => state.banner
  );

  useEffect(() => {
    dispatch(fetchAllBanners());
  }, [dispatch]);

  const heroBanners = banners.filter(
    (item) => item.location === "herosection"
  );

  if (loading) return <Loader />;
  if (error) return <DisplayError message={error} />;

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

        {heroBanners.map((v, i) => (
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
