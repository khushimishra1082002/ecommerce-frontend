import React, { useState, useEffect } from "react";
import { getTreandingProductData } from "../services/ProductService";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperButtonTwo from "../components/SwiperButtonTwo";
import SwiperButtonThree from "../components/SwiperButtonThree";
import conf from "../config/Conf";
import { BsCart } from "react-icons/bs";

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  // add other fields as needed
};

const TrendingProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const navigate = useNavigate();

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
    <div className="bg-white p-4 m-3 space-y-4">
      <div className="">
        <h2 className="font-heading text-lg font-bold ">
        {/* 🔥 Trending Now */}
      </h2>
      <p className="text-sm text-gray-500 font-body  ">
        Discover the most popular picks everyone’s loving this week.
      </p>
      </div>

      <div className="bg-black/10 w-full h-[1px]"></div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={5}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          240: {
            slidesPerView: 1,
            spaceBetween: 6,
          },
          340: {
            slidesPerView: 1,
            spaceBetween: 6,
          },
          440: {
            slidesPerView: 2,
            spaceBetween: 6,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 6,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 6,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 6,
          },
        }}
      >
        <span
          slot="container-start"
          className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200"
        >
          <SwiperButtonThree />
        </span>
        {data.map((v, i) => (
          <SwiperSlide key={i}>
            <Link
              to={`/${v._id}`}
              className="block bg-white border border-black/10 shadow"
            >
              <div className="h-44 flex justify-center items-center ">
                <img
                  className="w-40 object-contain h-full"
                  src={`${conf.BaseURL}${conf.GetImageUrl}/${v?.image}`}
                  alt={v?.name}
                />
              </div>
              <div className="py-6 px-[10px] flex flex-col gap-2">
                <span className="text-gray-400 font-body text-xs font-medium">
                  Great Deal
                </span>
                <p className="font-heading text-[13px] line-clamp-2  ">
                  {v.name}
                </p>
                <p className="font-heading text-[15px] line-clamp-2 font-medium  ">
                  Rs {v.price}
                </p>
                <button
                  onClick={() => navigate(`/${v._id}`)}
                  className="bg-black text-white px-2 py-2 rounded
                text-[13px] font-subHeading font-medium transition-none shadow
                flex justify-center items-center gap-1"
                >
                  <BsCart className="text-lg" />
                  Buy Now
                </button>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingProducts;
