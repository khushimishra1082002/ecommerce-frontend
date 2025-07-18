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
import conf from "../config/Conf";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { category, loading, error } = useSelector(
    (state: RootState) => state.allcategory
  );
  console.log("categoryiiiii",category);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  return (
    <>
      <div className="p-2 bg-white shadow overflow-hidden">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={60}
          slidesPerView={10}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
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
                    className="w-14"
                    // src={`${conf.GetImageUrl}/${v?.image}`}
                    src={`http://localhost:5000/api/upload/${v.image}`}
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
