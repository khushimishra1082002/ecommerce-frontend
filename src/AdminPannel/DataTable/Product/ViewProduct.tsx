import React from "react";
import { RxCross2 } from "react-icons/rx";

const ViewProduct = ({ closeProductDetailModal, singleProduct }) => {
  return (
    <div className="relative">
      <button onClick={closeProductDetailModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">View Product</h2>

      <div>
        <div className="grid grid-cols-2 gap-16 gap-y-4 font-heading text-[13px] font-light">
             <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Name</span>
            <span>{singleProduct?.name}</span>
          </div>
             <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Image</span>
            {singleProduct?.image && (
              <img
                src={`http://localhost:5000/api/upload/${singleProduct?.image}`}
                alt="Product"
                className="w-20 h-20 object-cover rounded border"
              />
            )}
          </div>
         
          <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Price</span>
            <span>₹{singleProduct?.price}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Category</span>
            <span>{singleProduct?.category.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Subcategory</span>
            <span>{singleProduct?.subcategory.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Brand</span>
            <span>{singleProduct?.brand?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Discount</span>
            <span>{singleProduct?.discount}%</span>
          </div>
         
          <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Stock</span>
            <span>{singleProduct?.stock}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Tax</span>
            <span>{singleProduct?.taxPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
