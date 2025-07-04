import React from "react";
import HeroSection from "../components/HeroSection";
import Categories from "./Categories";
import FeaturedBrands from "./FeaturedBrands";
import ProductSlider from "./ProductsSlider";
import FourGridProductLayout from "../components/FourGridProductLayout";
import TrendingProducts from "./TrendingProducts";
import TopBrands from "./TopBrands";
import BannerCarosoul from "../components/BannerCarosoul";
import NewArrivals from "./NewArrivals";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import RecommendedProducts from "./RecommendedProducts";
import PosterCarosoul from "../components/PosterCarosoul";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
  return (
    <>
      <div className=" bg-gray-100 space-y-2">
        <Categories />
        <HeroSection />
        <FourGridProductLayout/>
        <TrendingProducts/>
        <BannerCarosoul/>
        <ProductSlider />
        <ProductSlider />
        <ProductSlider />
        <ProductSlider />
        <NewArrivals/>
        <PosterCarosoul/>
        <FeaturedProducts/>
        {/* <RecentlyViewedProducts/> */}
        {/* <RecommendedProducts/> */}
      </div>
    </>
  );
};

export default Home;
