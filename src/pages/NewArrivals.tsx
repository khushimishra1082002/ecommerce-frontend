import React, { useState, useEffect } from "react";
import { getNewArrivalsProductData } from "../services/ProductService";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const NewArrivals = () => {
  const [data, setData] = useState([]);

  console.log("data", data);

  useEffect(() => {
    const fetchnewArivalsProduct = async () => {
      try {
        const res = await getNewArrivalsProductData();
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchnewArivalsProduct();
  }, []);

  return (
    <>
      <div className="bg-white p-4 space-y-4 m-3">
        <div className="flex flex-col">
          <h2 className="font-heading text-lg font-semibold ">New Arrivals</h2>
          <span className="font-body text-sm font-light">
          Products You Absolutely Can't miss{" "}
        </span>
          <div className="w-full bg-black/15 h-[1px] my-3"></div>
        </div>

        <div className="space-y-8 p-4 bg-white my-3">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={14}
            slidesPerView={5}
            navigation
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className=""
          >
            {data.map((v, i) => {
              return (
                <SwiperSlide>
                  <div className="flex flex-col  border border-black/10 rounded-md p-2 gap-4 ">
                    <div>
                      <span
                        className=" bg-red-500 text-white p-1 text-xs font-body font-medium
         "
                      >
                        New
                      </span>
                    </div>
                    <div className="h-52">
                       <img
                      className="w-48 h-full object-contain"
                      src={`http://localhost:5000/api/upload/${v.image}`}
                    />
                    </div>
                    <span className=" font-body text-sm line-clamp-3">{v.name}</span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
