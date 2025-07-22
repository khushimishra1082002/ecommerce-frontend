import React, { useEffect } from "react";
import { Boxes, Layers, ListOrdered, Package } from "lucide-react";
import RevenueChart from "./RevenueChart";
import CategoryPieChart from "./CategoryPieChart";
import ProductTable from "./DataTable/Product/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchAllCategory } from "../ReduxToolkit/Slices/CategorySlice";
import { fetchSubcategories } from "../ReduxToolkit/Slices/SubcategorySlice";
import { fetchAllProducts } from "../ReduxToolkit/Slices/ProductSlice";
import { fetchBrands } from "../ReduxToolkit/Slices/BrandSlice";

const DashboardHomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { category, loading, error } = useSelector(
    (state: RootState) => state.allcategory
  );
  console.log("category", category);

  const {
    subcategories,
    loading: subcategoryLoading,
    error: subcategoryError,
  } = useSelector((state: RootState) => state.subcategory);

  const { products } = useSelector((state: RootState) => state.allproducts);
  console.log("products", products);

  const {
    brands,
    loading: brandLoading,
    error: brandError,
  } = useSelector((state: RootState) => state.brand);

  console.log("brands", brands);

  useEffect(() => {
    dispatch(fetchAllCategory());
    dispatch(fetchSubcategories());
    dispatch(fetchAllProducts());
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Products */}
        <div className="relative flex gap-4 items-center border border-black/5 p-6 rounded-md bg-white shadow-sm">
          <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-md">
            <Boxes className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Products</span>
            <span className="text-xl font-bold text-gray-800">
              {products.length}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div
          className="relative flex gap-4 items-center border
         border-black/5 p-6 rounded-md bg-white shadow-sm"
        >
          <div className="w-12 h-12 bg-cyan-100 flex items-center justify-center rounded-md">
            <Layers className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Categories</span>
            <span className="text-xl font-bold text-gray-800">
              {category.length}
            </span>
          </div>
        </div>

        {/* Subcategories */}
        <div className="relative flex gap-4 items-center border border-black/5 p-6 rounded-md bg-white shadow-sm">
          <div className="w-12 h-12 bg-pink-100 flex items-center justify-center rounded-md">
            <ListOrdered className="w-6 h-6 text-pink-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Subcategories</span>
            <span className="text-xl font-bold text-gray-800">
              {subcategories.length}
            </span>
          </div>
        </div>

        {/* Brands */}
        <div className="relative flex gap-4 items-center border border-black/5 p-6 rounded-md bg-white shadow-sm">
          <div className="w-12 h-12 bg-purple-100 flex items-center justify-center rounded-md">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Brands</span>
            <span className="text-xl font-bold text-gray-800">{brands.length}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2">
          <RevenueChart />
        </div>
        <CategoryPieChart />
      </div> 
    </div>
  );
};

export default DashboardHomePage;
