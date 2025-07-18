import React from "react";
import { useSwiper } from "swiper/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const SwiperButton = () => {
  const swiper = useSwiper();

  return (
    <div className="flex gap-2 justify-end mt-4">
      <button
        className="px-3 py-2 bg-black text-white rounded hover:scale-105 transition"
        onClick={() => swiper.slidePrev()}
      >
        <IoIosArrowBack />
      </button>
      <button
        className="px-3 py-2 bg-black text-white rounded hover:scale-105 transition"
        onClick={() => swiper.slideNext()}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default SwiperButton;
