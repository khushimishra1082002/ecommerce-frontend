import React, { useState, useEffect } from "react";
import { getTreandingProductData } from "../services/ProductService";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperButtonTwo from "../components/SwiperButtonTwo";
import SwiperButtonThree from "../components/SwiperButtonThree";

const TrendingProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const res = await getTreandingProductData();
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchTrendingProducts();
  }, []);

  return (
    <div className="bg-white p-4 m-3">
      <h2 className="font-heading text-lg font-semibold mb-4">
        Trending Products
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={6}
        
        autoplay={{ delay: 3000 }}
        breakpoints={{
          1024: { slidesPerView: 6 },
          768: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
         <span slot="container-start"
              className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200">
              <SwiperButtonThree/>
              </span>
        {data.map((v, i) => (
          <SwiperSlide key={i}>
            <Link to={`/${v._id}`} className="block bg-white border border-black/10">
              <div className="h-52 flex justify-center items-center">
                <img
                  className="w-44 object-contain h-full"
                  src={`http://localhost:5000/api/upload/${v.image}`}
                  alt={v.name}
                />
              </div>
              <div className="p-2">
                <span className="text-gray-400 font-body text-xs font-medium">
                  Great Deal
                </span>
                <p className="font-heading text-sm line-clamp-2 ">{v.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingProducts;
