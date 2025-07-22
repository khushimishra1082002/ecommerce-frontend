import React, { useState, useEffect } from "react";
import { getUserOrdersData } from "../../services/OrderService";
import { decodeToken } from "../../utils/decodeToken";
import { format } from "date-fns";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { OrderDTO } from "../../types/order";

const MyOrders = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;

  const [orders, setOrders] = useState<OrderDTO[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getUserOrdersData(userId);
      setOrders(res);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center text-lg font-medium mt-20 text-gray-700">
        Loading Orders...
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 p-8">
        <div className="bg-white p-6 space-y-6">
          <div className="flex gap-2 items-center">
            <FaShoppingCart className="text-cyan-400 text-2xl" />
            <h4 className="font-heading text-xl font-semibold">My Orders</h4>
          </div>
          <div className="space-y-6">
            {orders.map((order, i) => {
              return (
                <div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-medium font-heading">
                        Order ID : {order._id.slice(-6)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-6 py-2 rounded border border-black/10 
                    font-heading text-sm flex justify-center items-center gap-1 "
                      >
                        <IoDocumentTextOutline />
                        Invoice
                      </button>

                      <button
                        className="px-6 py-2 rounded bg-green-500 text-white font-semibold
                    font-heading flex justify-center items-center text-sm gap-1"
                      >
                        <FaMapMarkedAlt />
                        Track Order
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div>
                      <p className="text-sm text-gray-500 mt-1 font-heading">
                        Order Date:{" "}
                        <span
                          className="font-heading text-gray-700
                    "
                        >
                          {format(
                            new Date(order.createdAt),
                            "dd MMM yyyy, hh:mm a"
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="bg-black/20 w-[1px] h-4"></div>
                    <div className="flex gap-1 items-center text-green-500 text-base">
                      <MdFlight className="text-xl" />
                      <span
                        className="font-body  text-green-500
                    "
                      >
                        Estimated Delivery : May 14,2022
                      </span>
                    </div>
                  </div>
                  <div className="bg-black/5 w-full h-[1px] my-5"></div>
                  {/* Ordered Items */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Items ({order.items.length})
                    </h4>
                    <ul className="space-y-4">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between  items-center gap-4">
                         <div className="flex  items-center gap-4">
                           <img
                            src={`http://localhost:5000/api/upload/${item.productId.image[0]}`}
                            alt={item.productId.name}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                          <div>
                            <p className=" text-gray-900 font-body text-sm">
                              {item.productId.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              ₹{item.productId.price} × {item.quantity} = ₹
                              {item.productId.price * item.quantity}
                            </p>
                          </div>
                         </div>
                         <div>
                          <div>
                            <button className="px-3 py-1 rounded-2xl bg-yellow-500 text-white
                            font-body flex justify-center items-center text-[13px]">
                             {order.status}
                            </button>
                          </div>
                         </div>
                        </li>
                      ))}
                    </ul>
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

export default MyOrders;
