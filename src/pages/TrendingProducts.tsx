import React, { useState, useEffect } from "react";
import { getTreandingProductData } from "../services/ProductService";

const TrendingProducts = () => {
  const [data, setData] = useState([]);

  console.log("data", data);

  useEffect(() => {
    const fetchnewArivalsProduct = async () => {
      try {
        const res = await getTreandingProductData();
        setData(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchnewArivalsProduct();
  }, []);
  return (
    <>
      <div className="bg-white p-4 space-y-4 m-3">
        <div className="flex flex-col">
          <h2 className="font-heading text-lg font-semibold ">
            Treanding Products
          </h2>

          <div className="w-full bg-black/15 h-[1px] my-3"></div>

          <div className=" grid grid-cols-6 gap-3 bg-gray-50 py-4">
            {data.map((v, i) => {
              return (
                <div className=" bg-white shadow ">
                  <div className=" h-52">
                    <img
                      className="w-44 object-contain h-full"
                      src={`http://localhost:5000/api/upload/${v.image}`}
                      alt="banner"
                    />
                  </div>
                  <div className="p-2">
                    <span className="text-gray-400 font-body text-xs font-medium">
                      Great Deal
                    </span>
                    <p className=" font-body text-sm line-clamp-3">
                      {v.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingProducts;
