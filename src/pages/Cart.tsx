import React, { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
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
    dispatch(fetchcartProduct(userId));
  }, [dispatch]);

  const handleCartProductDelete = async (productId) => {
    console.log(productId);
    const res = await DeleteProductFromCartData(userId, productId);
    alert("Product Deleted From Cart");
    console.log(res);
    await dispatch(fetchcartProduct(userId));
  };

  const handleChangeQuantity = (productId, quantity) => {
    console.log("kfksfslfsl");

    console.log("productId", productId);
    console.log("quantity", quantity);

    dispatch(updateQuantity({ userId, productId, quantity }));
  };

  return (
    <>
      <div className=" p-4 shadow space-y-7 bg-white ">
        <h2 className=" font-heading text-xl font-medium">
          Your Shopping Cart
        </h2>
        <div className=" grid gap-4 bg-white ">
          {/* First */}
          <div className="space-y-4 p-2 m-4">
            {cart?.items?.map((v, i) => {
              const product = v.productId;
              return (
                <div key={v._id} className=" space-y-2">
                  <div className="grid grid-cols-5 gap-4 col-span-2 ">
                    <div className="border border-black/10 p-2 rounded h-44 ">
                      <img
                        className="h-full w-full object-contain"
                    src={`${conf.BaseURL}${conf.GetImageUrl}/${product?.image}`}
                       
                        alt="product"
                      />
                    </div>
                    <div
                      className="col-span-2 space-y-3 flex flex-col justify-center
                    "
                    >
                      <span className="text-green-500 font-body font-medium">
                        In stock
                      </span>
                      <h4 className="font-body text-sm line-clamp-2">
                        {product?.name}
                      </h4>

                      <div className="flex gap-2">
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
                      </div>
                    </div>
                    <div className="flex justify-between  col-span-2 py-16">
                      <div>
                        <span className="font-body">Rs {product?.price}</span>
                      </div>

                      <div className="flex  items-center ">
                        <MdDelete className=" text-red-600"/>
                        <div className=" p-1 cursor-pointer">
                          <span
                            onClick={() => handleCartProductDelete(product._id)}
                            className="text-sm font-body text-orange-600"
                          >
                            Remove
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/10 w-full h-[1px]"></div>
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
