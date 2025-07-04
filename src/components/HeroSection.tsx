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
import axios from "axios";
import { getBannerData } from "../services/BannerServices";

const HeroSection = () => {
  const [data, setData] = useState([]);

  console.log("data", data);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBannerData();
        const heroBanners = res.filter(
          (item) => item.location === "herosection"
        );
        setData(heroBanners);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchBanners();
  }, []);

  return (
    <>
      <div className="overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="overflow-hidden"
        >
          {data.map((v, i) => {
            return (
              <SwiperSlide>
                <div className="h-60">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:5000/api/upload/${v.image}`}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default HeroSection;
