import React from "react";
import ProductSlider from "./ProductsSlider";

const AllProductSlider = () => {
  const sliders = [
    {
      title: "Top Deals on Footwear",
      filterQuery: { category: "Footwear"},
    },
    {
      title: "Mobiles Under ₹10,000",
      filterQuery: { category: "Mobiles", maxPrice: 10000 },
    },
    {
      title: "20% Off or More",
      filterQuery: { discount: ["20"] }, 
    },
    {
      title: "Electronics",
      filterQuery: { category: "Electronics" },
    },
     {
      title: "Best Beauty Brands with great deal",
      filterQuery: { category: "Beauty" },
    },
    {
      title: "Best Brands with great deal",
      filterQuery: { category: "Fashion" },
    },
  ];

  return (
    <div>
      {sliders.map((slider, i) => (
        <ProductSlider
          key={i}
          title={slider.title}
          filterQuery={slider.filterQuery}
        />
      ))}
    </div>
  );
};

export default AllProductSlider;
