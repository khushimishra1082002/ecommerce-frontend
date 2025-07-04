import React from 'react'
import {
  Boxes,
  Layers,
  ListOrdered,
  Package,
} from "lucide-react";
import RevenueChart from './RevenueChart';
import CategoryPieChart from './CategoryPieChart';
import ProductTable from "./DataTable/Product/ProductTable"

const DashboardHomePage = () => {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-4 gap-4'>
        {/* Products */}
        <div className="relative flex gap-4 items-center border border-black/5 p-6 rounded-md bg-white shadow-sm">
          <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-md">
            <Boxes className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Products</span>
            <span className="text-xl font-bold text-gray-800">500 + </span>
          </div>
        </div>

        {/* Categories */}
        <div className="relative flex gap-4 items-center border
         border-black/5 p-6 rounded-md bg-white shadow-sm">
          <div className="w-12 h-12 bg-cyan-100 flex items-center justify-center rounded-md">
            <Layers className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Categories</span>
            <span className="text-xl font-bold text-gray-800">500 + </span>
          </div>
        </div>

        {/* Subcategories */}
        <div className="relative flex gap-4 items-center border border-black/5 p-6 rounded-md bg-white shadow-sm">
          <div className="w-12 h-12 bg-pink-100 flex items-center justify-center rounded-md">
            <ListOrdered className="w-6 h-6 text-pink-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Subcategories</span>
            <span className="text-xl font-bold text-gray-800">500 + </span>
          </div>
        </div>

        {/* Brands */}
        <div className="relative flex gap-4 items-center border border-black/5 p-6 rounded-md bg-white shadow-sm">
          <div className="w-12 h-12 bg-purple-100 flex items-center justify-center rounded-md">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading">Brands</span>
            <span className="text-xl font-bold text-gray-800">500 + </span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2'>
       <div className='col-span-2'>
         <RevenueChart/>
       </div>
      <CategoryPieChart/>
     
      </div>
     
    </div>
  );
};

export default DashboardHomePage;
