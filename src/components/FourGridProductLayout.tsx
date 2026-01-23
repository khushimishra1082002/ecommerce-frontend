import React, { useEffect, useState } from "react";
import FourGridProduct from "./FourGridProduct";

const FourGridProductLayout = () => {
  const data = [
    {
      title: "Top Deals on Footwear",
      filterQuery: { category: "Footwear" },
    },
    {
      title: "New Fashion products",
      filterQuery: {
        category: "Fashion",
      },
    },
    {
      title: "20% Off or More",
      filterQuery: { discount: ["20"] },
    },
    {
      title: "Electronics",
      filterQuery: { category: "Electronics" },
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-100 m-4">
        {data.map((v, i) => (
          <FourGridProduct
            key={i}
            title={v.title}
            filterQuery={v.filterQuery}
          />
        ))}
      </div>
    </>
  );
};

export default FourGridProductLayout;
