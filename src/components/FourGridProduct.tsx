import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";

interface Product {
  _id: string;
  image: string;
  subcategory: {
    name: string;
  };
}

interface FourGridProductProps {
  title: string;
  products: Product[];
}

const FourGridProduct: React.FC<FourGridProductProps> = ({
  title,
  products,
}) => {
  return (
    <div className="p-4 gap-2 bg-white space-y-3">
      <div className="flex items-center gap-2">
        <IoIosArrowDropleftCircle className="text-xl" />
        <h2 className="font-heading font-medium text-base">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product) => (
          <Link to={`/${product._id}`} key={product._id}>
            <div className="border border-black/10 bg-white flex flex-col justify-center items-center p-2">
              <div className="">
                <img
                  className="w-20 h-20 object-contain m-auto"
                  src={`http://localhost:5000/api/upload/${product.image}`}
                  alt={product.subcategory.name}
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
  );
};

export default FourGridProduct;
