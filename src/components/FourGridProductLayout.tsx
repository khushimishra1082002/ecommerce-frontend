import React, { useEffect, useState } from "react";
import FourGridProduct from "./FourGridProduct";
import {
  getNewArrivalsProductData,
  getFeaturedProductData,
  getTreandingProductData,
} from "../services/ProductService"; 

const FourGridProductLayout = () => {
  const [featured, setFeatured] = useState([]);
  console.log("featured",featured);
  
  const [newArrivals, setNewArrivals] = useState([]);
  console.log("newArrivals",newArrivals);
  
  const [trending, setTrending] = useState([]);
  console.log("trending",trending);
  

 useEffect(() => {
  const fetchData = async () => {
    try {
      const featuredData = await getFeaturedProductData();
      const newArrivalsData = await getNewArrivalsProductData();
      const trendingData = await getTreandingProductData();

      setFeatured(
        featuredData.slice(0, 4).map((p) => ({
          _id:p._id,
          image: p.image?.[0],
          subcategory: p.subcategory,
        }))
      );
      setNewArrivals(
        newArrivalsData.slice(0, 4).map((p) => ({
          _id:p._id,

          image: p.image?.[0],
          subcategory: p.subcategory,
        }))
      );
      setTrending(
        trendingData.slice(0, 4).map((p) => ({
          _id:p._id,

          image: p.image?.[0],
          subcategory: p.subcategory,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch product sections", error);
    }
  };

  fetchData();
}, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-100 m-4">
      <FourGridProduct title="Featured Products" products={featured} />
      <FourGridProduct title="New Arrivals" products={newArrivals} />
      <FourGridProduct title="Trending Products" products={trending} />
      <FourGridProduct title="More to Explore" products={featured} />
    </div>
  );
};

export default FourGridProductLayout;
