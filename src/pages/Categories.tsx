import React, { useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchAllCategory } from "../ReduxToolkit/Slices/CategorySlice";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";
import Loader from "../components/Loader";
import DisplayError from "../components/DisplayError";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { category, loading, error } = useSelector(
    (state: RootState) => state.allcategory,
  );

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <DisplayError message={error}/>;
  }

  return (
    <>
      <div className="p-2 bg-white shadow overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={40}
          slidesPerView={10}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          breakpoints={{
            300: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            440: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 8,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 9,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 10,
              spaceBetween: 60,
            },
          }}
          className=""
        >
          {category.map((v, i) => {
            return (
              <SwiperSlide>
                <Link to={`/selectCategoryResult/${v._id}`}>
                  <div
                    className="w-24 h-24 rounded-md  
                    flex flex-col justify-center items-center"
                  >
                    <img
                      className="w-12 md:w-14"
                      src={getImageUrl(v.image)}
                    />

                    <span className="text-[13px] font-heading font-medium tracking-wider">
                      {v.name}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Categories;
