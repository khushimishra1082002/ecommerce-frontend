import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center space-y-6">
        <CheckCircle className="text-green-600 mx-auto" size={64} />

        <h2 className="text-2xl font-bold font-heading text-gray-800">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-600 text-sm font-body">
          Thank you for your purchase. Your order has been placed and is being
          processed. You will receive an order confirmation email shortly.
        </p>

        <div className="flex flex-col gap-1 pt-4">
          <button
            onClick={() => navigate("/")}
            className="
            bg-black text-sm font-heading my-2
             text-white font-medium py-2 px-4 rounded-lg"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/myOrders")}
            className="bg-gray-100 hover:bg-gray-200
             text-gray-800 font-medium py-2 px-4 rounded-lg text-sm font-heading"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
