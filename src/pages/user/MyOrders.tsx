// import React, { useState, useEffect } from "react";
// import { getUserOrdersData } from "../../services/OrderService";
// import { decodeToken } from "../../utils/decodeToken";
// import { format } from "date-fns";
// import { FaMapMarkedAlt } from "react-icons/fa";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { FaShoppingCart } from "react-icons/fa";
// import { MdFlight } from "react-icons/md";
// import { OrderDTO } from "../../types/order";
// import conf from "../../config/Conf";
// import { useNavigate } from "react-router-dom";
// import { getImageUrl } from "../../utils/getImageUrl";

// const MyOrders = () => {
//   const navigate = useNavigate();
//   const decoded = decodeToken();

// const userId = decoded?.id;
// if (!userId) return null; // or navigate somewhere

//   const [orders, setOrders] = useState<OrderDTO[]>([]);

//   console.log("orders", orders);

//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await getUserOrdersData(userId);
//       setOrders(res);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchOrders();
//     }
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="text-center text-lg font-medium mt-20 text-gray-700">
//         Loading Orders...
//       </div>
//     );
//   }

//   return (
//     <>
//       {orders.length > 0 ? (
//         <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-8">
//           <div className="bg-white p-4 sm:p-6 space-y-6">
//             <div className="flex gap-2 items-center">
//               <FaShoppingCart className="text-cyan-400 text-2xl" />
//               <h4 className="font-heading text-xl font-semibold">My Orders</h4>
//             </div>

//             <div className="space-y-6">
//               {orders.map((order, i) => (
//                 <div
//                   key={order._id}
//                   className="space-y-4 border rounded-md p-4 sm:p-5"
//                 >
//                   {/* Order Header */}
//                   <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
//                     <span className="text-base md:text-lg font-heading font-medium">
//                       Order ID: {order._id.slice(-6)}
//                     </span>
//                     <div className="flex flex-wrap gap-2">
//                       <button className="px-4 py-1.5 border rounded text-sm flex items-center gap-1">
//                         <IoDocumentTextOutline />
//                         Invoice
//                       </button>
//                       <button className="px-4 py-1.5 bg-black text-white rounded text-sm flex items-center gap-1">
//                         <FaMapMarkedAlt />
//                         Track Order
//                       </button>
//                     </div>
//                   </div>

//                   {/* Order Meta Info */}
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
//                     <p className="text-gray-500">
//                       Order Date:{" "}
//                       <span className="text-gray-700 font-medium">
//                         {format(
//                           new Date(order.createdAt),
//                           "dd MMM yyyy, hh:mm a"
//                         )}
//                       </span>
//                     </p>
//                     <div className="hidden sm:block bg-black/20 w-[1px] h-4" />
//                     <div className="flex items-center text-green-500 gap-1">
//                       <MdFlight className="text-xl" />
//                       <span>Estimated Delivery: </span>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4">
//                     {/* Ordered Items */}
//                     <h4 className="text-base font-semibold text-gray-900 mb-2">
//                       Items ({order.items.length})
//                     </h4>

//                     <ul className="space-y-4">
//                       {order.items.map((item, index) => (
//                         <li
//                           key={index}
//                           className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
//                         >
//                           <div className="flex items-start sm:items-center gap-4">
//                             <img
//                               src={getImageUrl(item?.productId?.image[0])}
//                               alt={item.productId.name}
//                               className="w-16 h-16 object-cover rounded border"
//                             />
//                             <div>
//                               <p className="text-gray-900 font-body text-sm sm:text-base">
//                                 {item.productId.name}
//                               </p>
//                               <p className="text-gray-600 text-sm">
//                                 ₹{item.productId.price} × {item.quantity} = ₹
//                                 {item.productId.price * item.quantity}
//                               </p>
//                             </div>
//                           </div>

//                           <div>
//                             <button className="px-4 py-1 bg-yellow-500 text-white text-sm rounded-full">
//                               {order.status}
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-white w-full px-4">
//           <div>
//             <img
//               className="w-48 sm:w-60 m-auto mb-6"
//               src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
//               alt="No orders illustration"
//             />
//           </div>

//           <h2 className="text-2xl font-semibold text-gray-800 font-heading">
//             🛒 You haven’t placed any orders yet
//           </h2>

//           <p className="text-gray-500 mt-3 text-sm sm:text-base font-body">
//             Once you make a purchase, your orders will appear here.
//           </p>

//           <button
//             onClick={() => navigate("/")}
//             className="mt-6 bg-black hover:bg-gray-800
//              text-white text-sm
//               py-2 px-6 rounded-lg transition duration-200 font-heading "
//           >
//             Start Shopping
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default MyOrders;
import React, { useState, useEffect } from "react";
import { getUserOrdersData } from "../../services/OrderService";
import { decodeToken } from "../../utils/decodeToken";
import { format } from "date-fns";
import { FaMapMarkedAlt, FaShoppingCart } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { OrderDTO } from "../../types/order";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

const MyOrders = () => {
  const navigate = useNavigate();
  const decoded = decodeToken();
  const userId = decoded?.id;

  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return; // exit early if no user
      try {
        const res = await getUserOrdersData(userId);
        setOrders(res);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (!userId) {
    return (
      <div className="text-center mt-20 text-gray-700">
        Please login to view orders.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-lg font-medium mt-20 text-gray-700">
        Loading Orders...
      </div>
    );
  }

  return (
    <>
      {orders.length > 0 ? (
        <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-8">
          <div className="bg-white p-4 sm:p-6 space-y-6">
            <div className="flex gap-2 items-center">
              <FaShoppingCart className="text-cyan-400 text-2xl" />
              <h4 className="font-heading text-xl font-semibold">My Orders</h4>
            </div>

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="space-y-4 border rounded-md p-4 sm:p-5"
                >
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row justify-between gap-3 md:items-center">
                    <span className="text-base md:text-lg font-heading font-medium">
                      Order ID: {order._id.slice(-6)}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-1.5 border rounded text-sm flex items-center gap-1">
                        <IoDocumentTextOutline />
                        Invoice
                      </button>
                      <button className="px-4 py-1.5 bg-black text-white rounded text-sm flex items-center gap-1">
                        <FaMapMarkedAlt />
                        Track Order
                      </button>
                    </div>
                  </div>

                  {/* Order Meta Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                    <p className="text-gray-500">
                      Order Date:{" "}
                      <span className="text-gray-700 font-medium">
                        {format(
                          new Date(order.createdAt),
                          "dd MMM yyyy, hh:mm a",
                        )}
                      </span>
                    </p>
                    <div className="hidden sm:block bg-black/20 w-[1px] h-4" />
                    <div className="flex items-center text-green-500 gap-1">
                      <MdFlight className="text-xl" />
                      <span>Estimated Delivery: </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    {/* Ordered Items */}
                    <h4 className="text-base font-semibold text-gray-900 mb-2">
                      Items ({order.items.length})
                    </h4>

                    <ul className="space-y-4">
                      {order.items.map((item, index) => {
                        // Type guard: ensure productId is an object
                        if (
                          !item.productId ||
                          typeof item.productId === "string"
                        )
                          return null;

                        const product = item.productId; // TS now knows this is ProductDTO

                        return (
                          <li
                            key={index}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                          >
                            <div className="flex items-start sm:items-center gap-4">
                              <img
                                src={getImageUrl(product.image[0])}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded border"
                              />
                              <div>
                                <p className="text-gray-900 font-body text-sm sm:text-base">
                                  {product.name}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  ₹{product.price} × {item.quantity} = ₹
                                  {product.price * item.quantity}
                                </p>
                              </div>
                            </div>

                            <div>
                              <button className="px-4 py-1 bg-yellow-500 text-white text-sm rounded-full">
                                {order.status}
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white w-full px-4">
          <div>
            <img
              className="w-48 sm:w-60 m-auto mb-6"
              src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
              alt="No orders illustration"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 font-heading">
            🛒 You haven’t placed any orders yet
          </h2>

          <p className="text-gray-500 mt-3 text-sm sm:text-base font-body">
            Once you make a purchase, your orders will appear here.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-black hover:bg-gray-800 text-white text-sm py-2 px-6 rounded-lg transition duration-200 font-heading"
          >
            Start Shopping
          </button>
        </div>
      )}
    </>
  );
};

export default MyOrders;
