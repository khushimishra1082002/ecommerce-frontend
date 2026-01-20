import React from "react";
import HeroSection from "../components/HeroSection";
import Categories from "./Categories";
import ProductSlider from "./ProductsSlider";
import FourGridProductLayout from "../components/FourGridProductLayout";
import TrendingProducts from "./TrendingProducts";
import NewArrivals from "./NewArrivals";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import RecommendedProducts from "./RecommendedProducts";
import PosterCarosoul from "../components/PosterCarosoul";
import FeaturedProducts from "./FeaturedProducts";
import AllProductSlider from "./AllProductSlider";

const Home = () => {
  return (
    <>
      <div className=" bg-gray-100 space-y-2">
        <Categories />
        <HeroSection />
        <FourGridProductLayout />
        <TrendingProducts />
        <AllProductSlider />
        <NewArrivals />
        <PosterCarosoul />
        <FeaturedProducts />
        <RecentlyViewedProducts />
        <RecommendedProducts />
      </div>
    </>
  );
};

export default Home;
