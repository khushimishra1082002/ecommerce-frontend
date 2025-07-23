import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getRecentlyViewedProductData } from "../services/ProductService";
import { decodeToken } from "../utils/decodeToken";
import { Link } from "react-router-dom";
import SwiperButtonThree from "../components/SwiperButtonThree";
import conf from "../config/Conf";

interface RecentlyViewedItem {
  _id: string;
  productId: {
    _id: string;
    image: string[];
    name: string;
    price: number;
  };
}

const RecentlyViewedProducts = () => {
  const [data, setData] = useState<RecentlyViewedItem[]>([]); 
  console.log("bbhhh", data);

  const decoded = decodeToken();
  const userId = decoded?.id;

  useEffect(() => {
    const fetchRecentlyViewedProduct = async () => {
      try {
        const res = await getRecentlyViewedProductData(userId);
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    if (userId) {
      fetchRecentlyViewedProduct();
    }
  }, [userId]);

  return (
    <>
      <div className="bg-white p-4 space-y-3 m-3">
        <div className="flex flex-col">
          <h2 className="font-heading text-lg font-semibold">
            Recently Viewed
          </h2>
          <span className="font-body text-sm font-light">
            A-listers to obsess over
          </span>
          <div className="w-full bg-black/10 h-[1px] my-3"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={6}
          breakpoints={{
            240: {
              slidesPerView: 1,
              spaceBetween: 6,
            },
            340: {
              slidesPerView: 2,
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
              slidesPerView: 6,
              spaceBetween: 6,
            },
          }}
          className=""
        >
          <span
            slot="container-start"
            className="w-full absolute top-1/2 -translate-y-1/2 z-10 duration-200"
          >
            <SwiperButtonThree />
          </span>
          {data?.map((v) => (
            <SwiperSlide key={v._id}>
              <Link to={`/${v.productId?._id}`}>
                <div
                  className="border rounded-lg p-4 flex flex-col gap-3
                  shadow-sm hover:shadow-md transition duration-200 "
                >
                  <div className="h-52">
                    <img
                      className="w-44 object-contain h-full"
                   
                      src={`${conf.BaseURL}${conf.GetImageUrl}/${v?.productId?.image?.[0]}`}
                      alt="product"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-body line-clamp-2">
                      {v?.productId?.name}
                    </p>
                    <p className="text-base font-body line-clamp-2">
                      Rs {v?.productId?.price}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default RecentlyViewedProducts;
