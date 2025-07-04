import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const brandImages = [
  { id: 1, name: "New Plumping Lip Oil", title:"Pout Perfect Shine",
     image: "https://images-static.nykaa.com/creatives/dff90868-c360-4922-ba32-1f71f21f5347/default.jpg?tr=cm-pad_resize,w-900" },
  { id: 2, name: "New Plumping Lip Oil",title:"Pout Perfect Shine",
     image: "https://images-static.nykaa.com/creatives/dff90868-c360-4922-ba32-1f71f21f5347/default.jpg?tr=cm-pad_resize,w-900" },
  { id: 3, name: "New Plumping Lip Oil", title:"Pout Perfect Shine",
    image: "https://images-static.nykaa.com/creatives/dff90868-c360-4922-ba32-1f71f21f5347/default.jpg?tr=cm-pad_resize,w-900" },
  { id: 4, name: "New Plumping Lip Oil",title:"Pout Perfect Shine",
     image: "https://images-static.nykaa.com/creatives/dff90868-c360-4922-ba32-1f71f21f5347/default.jpg?tr=cm-pad_resize,w-900" },
  { id: 5, name: "New Plumping Lip Oil",title:"Pout Perfect Shine",
     image: "https://images-static.nykaa.com/creatives/dff90868-c360-4922-ba32-1f71f21f5347/default.jpg?tr=cm-pad_resize,w-900" },
];

const TopBrands = () => {
  return (
    <div className="bg-white p-4 space-y-3 m-3">
      <div className="flex flex-col">
        <h2 className="font-heading text-lg font-semibold">
          Explore Our Top Brands
        </h2>
        <span className="font-body text-sm font-light">
          A-listers to obsess over
        </span>
        <div className="w-full bg-black/10 h-[1px] my-3"></div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        className=""
      >
        {brandImages.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="border rounded-lg p-4 flex flex-col gap-3
              shadow-sm hover:shadow-md transition duration-200 ">
              <img src={brand.image} alt={brand.name} 
              className="" />
              <div>
              <p className="text-lg font-body ">{brand.name}</p>
              <span className=" text-sm font-body text-gray-500">
                {brand.title}
              </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopBrands;
