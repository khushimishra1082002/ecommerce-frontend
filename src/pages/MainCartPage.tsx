import React from 'react';
import Cart from './Cart';
import CartTotal from './CartTotal';

const MainCartPage = () => {
  return (
    <div className="bg-gray-50 ">
      <div className="flex flex-col lg:flex-row px-4 md:px-6 py-6 gap-5">
        {/* Cart Section */}
        <div className="w-full lg:w-[73%] max-h-[70vh] overflow-y-auto">
          <Cart />
        </div>

        {/* Cart Total Section */}
        <div className="w-full lg:w-[27%]">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default MainCartPage;
