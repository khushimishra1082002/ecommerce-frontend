import React from "react";
import { useSwiper } from "swiper/react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const SwiperButtonThree = () => {
  const swiper = useSwiper();

  return (
    <>
      <div className="flex gap-1 items-center justify-between ">
        <button
          className=" rounded-md  bg-white border h-[14vh] text-4xl  hover:scale-105 duration-200 text-skin-primary font-thin"
          onClick={() => swiper.slidePrev()}
        >
          <IoIosArrowBack />
        </button>
        <button
          className=" rounded-md  bg-white border h-[16vh] text-4xl  hover:scale-105 duration-200 text-skin-primary font-thin"
          onClick={() => swiper.slideNext()}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};

export default SwiperButtonThree;
