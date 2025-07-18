import React, { useState, useEffect } from "react";
import { getUserOrdersData } from "../../services/OrderService";
import { decodeToken } from "../../utils/decodeToken";
import { format } from "date-fns";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdFlight } from "react-icons/md";

const MyOrders = () => {
  const decoded = decodeToken();
  const userId = decoded?.id;

  const [orders, setOrders] = useState([]);
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
          <div className="">
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
    // <div className="p-6 md:p-10 max-w-7xl mx-auto">
    //   <h2 className="text-4xl font-bold mb-10 text-gray-800">My Orders</h2>

    //   {orders.length === 0 ? (
    //     <div className="text-gray-500 text-lg text-center">No orders found.</div>
    //   ) : (
    //     <div className="space-y-8">
    //       {orders.map((order) => (
    //         <div
    //           key={order._id}
    //           className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    //         >
    //           <div className="flex justify-between items-center p-6 border-b border-gray-200">
    //             <div>
    //               <h3 className="text-xl font-semibold text-gray-800">
    //                 Order {order._id.slice(-6)}
    //               </h3>
    //               <p className="text-sm text-gray-500 mt-1">
    //                 Placed on:{" "}
    //                 {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
    //               </p>
    //             </div>
    //             <span
    //               className={`px-4 py-1 rounded-full text-sm font-semibold ${
    //                 order.status === "Pending"
    //                   ? "bg-yellow-100 text-yellow-700"
    //                   : "bg-green-100 text-green-700"
    //               }`}
    //             >
    //               {order.status}
    //             </span>
    //           </div>

    //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-sm text-gray-700">
    //             {/* Delivery Info */}
    //             <div className="space-y-1">
    //               <h4 className="text-lg font-semibold text-gray-900 mb-2">
    //                 Delivery Info
    //               </h4>
    //               <p>{order.deliveryInfo.fullname}</p>
    //               <p>{order.deliveryInfo.phoneNo}</p>
    //               <p>{order.deliveryInfo.email}</p>
    //               <p>
    //                 {order.deliveryInfo.address1}, {order.deliveryInfo.address2}
    //               </p>
    //               <p>
    //                 {order.deliveryInfo.city}, {order.deliveryInfo.state} -{" "}
    //                 {order.deliveryInfo.zip}
    //               </p>
    //             </div>

    // {/* Ordered Items */}
    // <div className="space-y-3">
    //   <h4 className="text-lg font-semibold text-gray-900 mb-2">
    //     Items ({order.items.length})
    //   </h4>
    //   <ul className="space-y-4">
    //     {order.items.map((item, index) => (
    //       <li key={index} className="flex items-center gap-4">
    //         <img
    //           src={item.image}
    //           alt={item.name}
    //           className="w-16 h-16 object-cover rounded-md border"
    //         />
    //         <div>
    //           <p className="font-medium text-gray-900">{item.name}</p>
    //           <p className="text-gray-600 text-sm">
    //             ₹{item.price} × {item.quantity} = ₹
    //             {item.price * item.quantity}
    //           </p>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    //             {/* Order Summary */}
    //             <div className="space-y-1">
    //               <h4 className="text-lg font-semibold text-gray-900 mb-2">Summary</h4>
    //               <p>Total Price: ₹{order.summary.totalPrice}</p>
    //               <p>Discount: ₹{order.summary.totalDiscount}</p>
    //               <p>Tax: ₹{order.summary.totalTax}</p>
    //               <p className="font-bold text-gray-900 text-lg mt-2">
    //                 Final Total: ₹{order.summary.finalTotal}
    //               </p>
    //               <p className="mt-2">
    //                 Payment:{" "}
    //                 <span className="font-medium">{order.paymentMethod}</span>
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default MyOrders;
