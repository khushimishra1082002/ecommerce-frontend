import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const BannerCarosoul = () => {
  return (
    <>
      <div className="space-y-8 p-4 bg-white my-3">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={14}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },

            620: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            900: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className=""
        >
          <SwiperSlide className=" ">
            <div className="h-60">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="https://images-static.nykaa.com/creatives/634c9137-7223-4ed2-99c9-d40beb92ffef/default.jpg?tr=cm-pad_resize,w-900"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide className=" ">
            <div className="h-60">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="https://images-static.nykaa.com/creatives/634c9137-7223-4ed2-99c9-d40beb92ffef/default.jpg?tr=cm-pad_resize,w-900"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className=" ">
            <div className="h-60">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="https://images-static.nykaa.com/creatives/634c9137-7223-4ed2-99c9-d40beb92ffef/default.jpg?tr=cm-pad_resize,w-900"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className=" ">
            <div className="h-60">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="https://images-static.nykaa.com/creatives/634c9137-7223-4ed2-99c9-d40beb92ffef/default.jpg?tr=cm-pad_resize,w-900"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default BannerCarosoul;
