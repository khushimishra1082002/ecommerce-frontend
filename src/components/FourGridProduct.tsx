import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { ProductDTO } from "../types/product";
import { getFilterProductsData } from "../services/ProductService";
import { getImageUrl } from "../utils/getImageUrl";
import DisplayError from "./DisplayError";
import Loader from "./Loader";

interface FourGridProductProps {
  title: string;
  filterQuery: Record<string, any>;
}

const FourGridProduct: React.FC<FourGridProductProps> = ({
  title,
  filterQuery,
}) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFilterProductsData(filterQuery);
        setProducts(data);
      } catch (err: any) {
        console.error("Failed to fetch filtered products", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filterQuery]);

  return (
    <div className="p-4 gap-2 bg-white space-y-3 min-h-[260px]">
      <div className="flex items-center gap-2">
        <IoIosArrowDropleftCircle className="text-xl" />
        <h2 className="font-heading font-semibold text-base">{title}</h2>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      )}

      {error && <DisplayError message={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-2 gap-2">
          {products.slice(0, 4).map((product) => (
            <Link to={`/${product._id}`} key={product._id}>
              <div className="border border-black/10 bg-white flex flex-col justify-center items-center p-2">
                <img
                  className="w-24 h-24 object-contain"
                  src={getImageUrl(product.image)}
                  alt={product.subcategory?.name}
                />
                <span className="font-heading text-[13px] line-clamp-1 font-medium my-2">
                  {product.subcategory.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FourGridProduct;
