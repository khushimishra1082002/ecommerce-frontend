import React, { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import {
  fetchcartProduct,
  updateQuantity,
} from "../ReduxToolkit/Slices/CartSlice";
import { decodeToken } from "../utils/decodeToken";
import { DeleteProductFromCartData } from "../services/cartService";
import { MdDelete } from "react-icons/md";
import conf from "../config/Conf";
import { FaCartShopping } from "react-icons/fa6";
import { BsCart } from "react-icons/bs";

const Cart = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;

  console.log("decodeUser", userId);

  const dispatch = useDispatch<AppDispatch>();

  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  console.log("cart", cart);

  useEffect(() => {
    if (userId) {
      dispatch(fetchcartProduct(userId));
    }
  }, [dispatch]);

  const handleCartProductDelete = async (productId) => {
    console.log(productId);
    const res = await DeleteProductFromCartData(userId, productId);
    alert("Product Deleted From Cart");
    console.log(res);
    if (userId) {
      await dispatch(fetchcartProduct(userId));
    }
  };

  const handleChangeQuantity = (productId, quantity) => {
    console.log("productId", productId);
    console.log("quantity", quantity);
    if (userId) {
      dispatch(updateQuantity({ userId, productId, quantity }));
    }
  };

  return (
    <>
      <div className=" p-4 shadow space-y-6 bg-white ">
        <h2 className=" font-heading text-lg font-semibold flex items-center gap-2 tracking-wider">
          <BsCart className="text-xl" /> Your Shopping Cart
        </h2>
        <div className=" grid gap-4  ">
          {/* First */}
          <div className="">
            {cart?.items?.map((v, i) => {
              const product = v.productId;
              return (
                <div key={v._id} className=" space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4 
                  lg:h-44 border border-black/10  p-5 lg:p-1  ">
                    <div className=" w-full col-span-2">
                      <img
                        className="w-40 max-h-40 m-auto object-contain py-2"
                        src={`${conf.BaseURL}${conf.GetImageUrl}/${product?.image}`}
                        alt="product"
                      />
                    </div>
                    <div className=" col-span-4 my-auto space-y-2">
                      <span className="text-green-500 font-body font-medium">
                        In stock
                      </span>
                      <h4 className="font-heading font-medium text-[13px] line-clamp-2 leading-5  text-gray-800 ">
                        {product?.name}
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        <div className="flex text-sm">
                          <div
                            onClick={() =>
                              handleChangeQuantity(
                                v.productId._id || v.productId,
                                v.quantity + 1
                              )
                            }
                            className="flex justify-center items-center border border-black/10 px-3 p-2"
                          >
                            <GoPlus />
                          </div>
                          <div className="flex justify-center items-center border border-black/10 px-3 py-2">
                            {v.quantity}
                          </div>
                          <div
                            onClick={() =>
                              handleChangeQuantity(
                                v.productId._id || v.productId,
                                v.quantity - 1
                              )
                            }
                            className="flex justify-center items-center border border-black/10 px-3 p-2"
                          >
                            <FiMinus />
                          </div>
                        </div>
                        <div className="border border-black/10 p-2">
                          <button className="font-subHeading text-xs font-medium">
                            Save for later
                          </button>
                        </div>

                        <div className="flex  items-center ">
                          <MdDelete className=" text-red-600" />
                          <div className=" cursor-pointer">
                            <span
                              onClick={() =>
                                handleCartProductDelete(product._id)
                              }
                              className="text-sm font-body text-orange-600"
                            >
                              Remove
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-auto lg:mx-auto">
                      <div>
                        <span className="font-body">Rs {product?.price}</span>
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

export default Cart;
