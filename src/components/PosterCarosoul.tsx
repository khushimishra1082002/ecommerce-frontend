import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getPosterData } from "../services/PosterService";

const PosterCarosoul = () => {
  const [data, setData] = useState([]);

  console.log("ppppppp", data);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await getPosterData();
        setData(res);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchPosters();
  }, []);

  return (
    <>
      <div className="space-y-8 p-4 bg-white my-3">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={14}
          slidesPerView={3}
          navigation
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className=""
        >
          {data.map((v, i) => {
            return (
              <SwiperSlide className="relative">
                <div className="h-72 relative">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={`http://localhost:5000/api/upload/${v.image}`}
                    alt={v.title || "Poster Image"}
                  />
                  <div
                    className="absolute top-4 left-4
                  bg-black bg-opacity-50 text-white p-3 rounded-md max-w-[70%]"
                  >
                    <h2 className="text-xl font-heading font-semibold">
                      {v.title}
                    </h2>
                    <h3 className="text-sm">{v.subtitle}</h3>
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

export default PosterCarosoul;
