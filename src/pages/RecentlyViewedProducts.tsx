import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getRecentlyViewedProductData } from "../services/ProductService";
import { decodeToken } from "../utils/decodeToken";

const RecentlyViewedProducts = () => {
  const [data, setData] = useState([]);

  const decoded = decodeToken();
  const userId = decoded?.id;

  console.log("decodeUser", userId);

  console.log("gggg", data);

  useEffect(() => {
    const fetchRecentlyViewedProduct = async () => {
      try {
        const res = await getRecentlyViewedProductData(userId);
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchRecentlyViewedProduct();
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
          slidesPerView={5}
          className=""
        >
          {data.map((v) => (
            <SwiperSlide >
              <div
                className="border rounded-lg p-4 flex flex-col gap-3
                  shadow-sm hover:shadow-md transition duration-200 "
              >
                <div className="h-52">
                  <img
                  className="w-44 object-contain h-full"
                  src={`http://localhost:5000/api/upload/${v.productId.image}`}
                  alt="banner"
                />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-body line-clamp-2 ">{v.productId.name}</p>
                  <p className="text-base font-body line-clamp-2  ">Rs {v.productId.price}</p>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default RecentlyViewedProducts;
