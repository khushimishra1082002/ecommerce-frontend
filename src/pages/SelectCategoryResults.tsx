import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { Link, useParams } from "react-router-dom";
import { getFilterProductsData } from "../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { setCategory } from "../ReduxToolkit/Slices/FilterSlice";
import { ProductDTO } from "../types/product";
import conf from "../config/Conf";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";
import {getImageUrl} from "../utils/getImageUrl"

const SelectCategoryResults = () => {
  const { categoryID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filter);
  console.log(
    "Redux filters:",
    useSelector((state: RootState) => state.filter),
  );

  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);

  const fetchFilterProduct = async () => {
    try {
      const filterParams = filters;

      const query = buildQueryFromFilters(filterParams);
      console.log("FINAL QUERY:", query);
      console.log("munmun", filters);

      const res = await getFilterProductsData(filterParams);
      console.log("Filtered Products:", res);
      setFilteredProducts(res);
    } catch (err) {
      console.error("Error fetching filtered products:", err);
    }
  };

  useEffect(() => {
    if (categoryID) {
      dispatch(setCategory(categoryID));
      fetchFilterProduct();
    }
  }, [categoryID, filters, dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2">
      <div>
        <Filter categoryID={categoryID ?? ""} categoryName="" />
      </div>
      <div className=" sm:col-span-4 md:col-span-4 lg:col-span-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/${product._id}`}>
                <div
                  key={product._id}
                  className=" border border-black/10  space-y-1"
                >
                  <div className="h-52 bg-gray-50 flex justify-center items-center">
                    <img
                      src={getImageUrl(product?.image)}
                      className="w-36"
                      alt={product.name}
                    />
                  </div>
                  <div className="space-y-1 p-2">
                    <h4 className="text-[14px] font-heading line-clamp-2  font-medium">
                      {product.brand.name}
                    </h4>
                    <h4 className="text-[13px] font-heading line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="font-medium text-sm font-heading">
                      Rs {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="No products"
                className="w-36 h-36 mb-6 opacity-80"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 font-heading">
                No Products Found
              </h2>
              <p className="text-gray-600 text-sm max-w-sm font-body">
                Sorry, we couldn’t find any items that match your current
                filters. Please try adjusting the filters or browse other
                categories.
              </p>
              <Link
                to="/"
                className="mt-6 inline-block bg-black text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-heading"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCategoryResults;
