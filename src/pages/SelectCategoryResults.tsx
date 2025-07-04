import React from "react";
import ProductSlider from "./ProductsSlider";
import Filter from "./Filter";
import { useParams } from "react-router-dom";

const SelectCategoryResults = () => {
  const { categoryID } = useParams();

  console.log("categoryID",categoryID);
  
  return (
    <>
      <div className="grid grid-cols-5 gap-2">
        <div>
          <Filter categoryID = {categoryID} />
        </div>

        <div className="col-span-4">
          <div className="">
            <img
              className="h-60 w-full"
              src="https://images-static.nykaa.com/uploads/0b169a37-6755-45e2-8570-baf403fcac78.jpg?tr=cm-pad_resize,w-1800"
            />
            <div className="flex flex-col p-4">
              <div className="w-full bg-black/15 h-[1px] my-3"></div>
              <ProductSlider />
              <div className="w-full bg-black/10 h-[1px] my-3"></div>
              <ProductSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectCategoryResults;
