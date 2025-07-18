import React from "react";
import { useSwiper } from "swiper/react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const SwiperButtonTwo = () => {
  const swiper = useSwiper();

  return (
    <>
      <div className="flex gap-1 items-center justify-between ">
        <button
          className="p-2 rounded-full  bg-skin-accent_one  hover:scale-105 duration-200 text-white"
          onClick={() => swiper.slidePrev()}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="p-2 rounded-full  bg-skin-accent_one  hover:scale-105 duration-200 text-white"
          onClick={() => swiper.slideNext()}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};

export default SwiperButtonTwo;
