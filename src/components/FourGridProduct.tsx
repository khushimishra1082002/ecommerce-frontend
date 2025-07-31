import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import conf from "../config/Conf";
import { ProductDTO } from "../types/product";
import { getFilterProductsData } from "../services/ProductService";

interface FourGridProductProps {
  title: string;
  filterQuery: Record<string, any>;
}

const FourGridProduct: React.FC<FourGridProductProps> = ({
  title,
  filterQuery,
}) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const data = await getFilterProductsData(filterQuery);
        console.log("data", data);
        setProducts(data);
      } catch (err) {
        console.error(" Failed to fetch filtered products", err);
      }
    };

    fetchFilteredProducts();
  }, [filterQuery]);

  return (
    <>
      <div className="p-4 gap-2 bg-white space-y-3">
        <div className="flex items-center gap-2">
          <IoIosArrowDropleftCircle className="text-xl" />
          <h2 className="font-heading font-medium text-base">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {products.slice(0, 4).map((product) => (
            <Link to={`/${product._id}`} key={product._id}>
              <div className="border border-black/10 bg-white flex flex-col justify-center items-center p-2">
                <div className="">
                  <img
                    className="w-24 h-24 object-contain m-auto"
                    src={`${conf.BaseURL}${conf.GetImageUrl}/${product.image}`}
                    alt={product?.subcategory?.name}
                  />
                </div>
                <span className="font-heading text-[13px] line-clamp-1 font-medium">
                  {product.subcategory.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default FourGridProduct;
