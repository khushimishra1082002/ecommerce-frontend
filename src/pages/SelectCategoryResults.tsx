import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useParams } from "react-router-dom";
import { getFilterProductsData } from "../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";
import { setCategory } from "../ReduxToolkit/Slices/FilterSlice";
import { ProductDTO } from "../types/product";

const SelectCategoryResults = () => {
  const { categoryID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filter);
  console.log(
    "Redux filters:",
    useSelector((state: RootState) => state.filter)
  );

  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);

  const fetchFilterProduct = async () => {
    try {
      const filterParams = {
        ...filters,
        category: categoryID,
      };
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
    <div className="grid grid-cols-5 gap-2">
      <div>
        <Filter categoryID={categoryID} />
      </div>
      <div className="col-span-4 p-4">
        <div className="grid grid-cols-4 gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="border shadow p-2 space-y-1">
                <div className="h-52 bg-gray-50 flex justify-center items-center">
                  <img
                    src={`http://localhost:5000/api/upload/${product.image}`}
                    className="w-36"
                    alt={product.name}
                  />
                </div>
                <h4 className="text-sm font-heading line-clamp-2">
                  {product.name}
                </h4>
                <p className="font-medium font-heading">Rs {product.price}</p>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCategoryResults;
