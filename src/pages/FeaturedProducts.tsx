import React, { useState, useEffect } from "react";
import { getFeaturedProductData } from "../services/ProductService";

const FeaturedProducts = () => {
  const [data, setData] = useState([]);

  console.log("data", data);

  useEffect(() => {
    const fetchnewArivalsProduct = async () => {
      try {
        const res = await getFeaturedProductData();
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchnewArivalsProduct();
  }, []);

  return (
    <div className="bg-white p-4 space-y-4 m-3">
      <div className="flex flex-col">
        <h2 className="font-heading text-lg font-semibold ">
          Featured Products
        </h2>
        <span className="font-body text-sm font-light">
          Products You Absolutely Can't miss{" "}
        </span>
        <div className="w-full bg-black/15 h-[1px] my-3"></div>
        <div className="grid grid-cols-6 gap-2 py-2">
          {data.map((v, i) => {
            return (
              <div className="space-y-2 border border-black/5">
                <div className="w-full h-60 rounded-md overflow-hidden">
                  <img
                    className="w-44 object-contain h-full"
                    src={`http://localhost:5000/api/upload/${v.image}`}
                    alt="banner"
                  />
                </div>
                <div className=" flex flex-col p-2">
                  <h3 className=" text-sm font-body">
                    UP TO {v.discount} OFF
                  </h3>
                  <span className="font-heading text-sm line-clamp-2">{v.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
