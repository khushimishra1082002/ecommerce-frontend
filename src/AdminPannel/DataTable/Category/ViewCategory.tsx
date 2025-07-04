import React from "react";
import { RxCross2 } from "react-icons/rx";

const ViewCategory = ({closeCategoryDetailModal,singleCategory}) => {
  return (
    <div className="relative">
      <button onClick={closeCategoryDetailModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">View Category</h2>

      <div>
        <div className="grid grid-cols-1 gap-y-4 font-heading text-[13px] font-light">
             <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Name</span>
            <span>{singleCategory?.name}</span>
          </div>
             <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Image</span>
            {singleCategory?.image && (
              <img
                src={`http://localhost:5000/api/upload/${singleCategory?.image}`}
                alt="Product"
                className="w-20 h-20 object-cover rounded border"
              />
            )}
          </div>
           <div className="flex flex-col">
            <span className="text-sm font-heading font-medium">Description</span>
            <span>{singleCategory?.description}</span>
          </div>
         
        
        
         
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;

