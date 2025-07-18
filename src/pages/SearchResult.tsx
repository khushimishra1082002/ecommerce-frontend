import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { FaAngleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchAllCategory } from "../ReduxToolkit/Slices/CategorySlice";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";
import { getFilterProductsData } from "../services/ProductService";

const SearchResult = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useParams();
  console.log(query);
  const [products, setProducts] = useState([]);
  console.log("products", products);
  const [filterProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");

  console.log("filterProducts", filterProducts);

  const { category, loading, error } = useSelector(
    (state: RootState) => state.allcategory
  );
  console.log("categoryiiiii", category);
  // const selectedCategory = category.find((cat) => cat._id === query);
  const selectedCategory = category.find(
  (cat) => cat._id === query || cat.name.toLowerCase() === query?.toLowerCase()
);

  const categoryName = selectedCategory?.name || "";

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  // const {
  //   categories,
  //   subcategories,
  //   gender,
  //   brands,
  //   priceRange,
  //   size,
  //   colors,
  // } = useSelector((state: RootState) => state.filter);

  // console.log("category",category);
  // console.log("subcategoriesFROMSLICES", subcategories);
  // console.log("categories", categories);
  // console.log("gender", gender);
  // console.log("brands", brands);
  // console.log("priceRange", priceRange);
  // console.log("size", size);
  // console.log("colors", colors);

  const filters = useSelector((state: RootState) => state.filter);

  const queryString = buildQueryFromFilters(filters);

  const fetchFilteredProducts = async () => {
    // Clone current filters
    // const updatedFilters = { ...filters };

    // // Inject category filter from the URL param if not already present
    // if (!updatedFilters.categories || updatedFilters.categories.length === 0) {
    //   updatedFilters.categories = [query];
    // }

    const updatedFilters = { ...filters };

// Check if query matches a known category ID or name
const matchedCategory = category.find(
  (cat) => cat._id === query || cat.name.toLowerCase() === query?.toLowerCase()
);

if (matchedCategory) {
  updatedFilters.category = matchedCategory._id;
} else {
  updatedFilters.q = query; // It's a keyword search
}


    try {
      const data = await getFilterProductsData(updatedFilters); // pass filters object, not query string
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // useEffect(() => {
  //   fetchFilteredProducts();
  // }, [filters]);

  useEffect(() => {
  fetchFilteredProducts();
}, [filters, query, category]);


  const sortedProducts = [...filterProducts];

  if (sortOption === "lowToHigh") {
  sortedProducts.sort((a, b) => a.price - b.price);
} else if (sortOption === "highToLow") {
  sortedProducts.sort((a, b) => b.price - a.price);
} else if (sortOption === "newest") {
  sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

  return (
    <>
      <div className=" bg-gray-100 gap-4 p-3 flex">
        <div className="w-[28%] shadow">
        <Filter categoryID={selectedCategory?._id || ""} categoryName={categoryName} />


        </div>
        <div className="bg-white shadow-sm w-full p-4 ">
          <div className="flex gap-1 items-center text-[12px]">
            <div className="">
              <span>Home</span>
            </div>
            <FaAngleRight />
            <span> {categoryName || "Products"}</span>
          </div>
          <h4 className="text-lg font-heading font-medium">
            {categoryName || "Products"}
          </h4>

          <div className="flex items-center gap-4 text-[13px] font-heading py-2">
            <div>
              <span className="font-medium text-sm">Sort By</span>
            </div>

            <div onClick={() => setSortOption("lowToHigh")}>
              <span className="cursor-pointer">Price -- Low to High</span>
            </div>

            <div onClick={() => setSortOption("highToLow")}>
              <span className="cursor-pointer">Price -- High to Low</span>
            </div>

            <div onClick={() => setSortOption("newest")}>
              <span className="cursor-pointer">Newest First</span>
            </div>
          </div>

          <div className="bg-black/5 w-full h-[1px]"></div>
          <div className="grid grid-cols-4 gap-4 py-4 bg-gray-50 px-3">
            {sortedProducts.map((v, i) => {
              return (
                <div className="bg-white shadow px-2 py-4">
                  <img
                    className="w-44 h-44 m-auto object-contain"
                    src={`http://localhost:5000/api/upload/${v.image}`}
                  />
                  <div className="p-2">
                    <h4
                      className="text-[14px] font-heading line-clamp-2
              "
                    >
                      {v.name}
                    </h4>
                    <div className="flex items-center">
                      <FaRupeeSign className="text-xs" />
                      <div className="flex gap-1 items-center">
                        <h4 className="text-base font-body">{v.price}</h4>
                      </div>
                    </div>
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

export default SearchResult;
