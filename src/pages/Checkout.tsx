import React, { useState, useEffect } from "react";
import DeliveryInformation from "./DeliveryInformation";
import PaymentMethod from "./paymentMethod";
import OrderSummaryPage from "../pages/OrderSummaryPage";
import OrderSuccessPage from "./OrderSuccessPage";
import { decodeToken } from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const decoded = decodeToken();
  const userId = decoded?.id;
  console.log("userId", userId);

  const handleDeliveryComplete = () => setStep(2);
  const handlePaymentComplete = () => setStep(3);
  const handleOrderComplete = () => {
    setStep(4);
    setShowOrderSuccessModal(true);
  };

  const closeOrderSuccessModal = () => {
    setShowOrderSuccessModal(false);
    navigate("/");
  };

  useEffect(() => {
    if (showOrderSuccessModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showOrderSuccessModal]);

  return (
    <div className="p-4 space-y-6 w-10/12 mx-auto">
      <h1 className="text-xl font-semibold font-heading ml-6 ">
        Checkout Details
      </h1>

      <div className="grid grid-cols-4 ">
        {/* Step Progress */}
        <div className="flex flex-col relative">
          {[1, 2, 3].map((num, idx) => (
            <div key={num} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 ${
                  step === num
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {num}
              </div>
              <span
                className={`mt-2 text-sm text-center font-semibold font-heading ${
                  step === num ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {num === 1 ? "Delivery" : num === 2 ? "Payment" : "Review"}
              </span>
              {idx !== 2 && <div className="w-px h-10 bg-blue-300 my-2" />}
            </div>
          ))}
        </div>

        <div className="w-full col-span-3">
          {step === 1 && (
            <DeliveryInformation onComplete={handleDeliveryComplete} />
          )}
          {step === 2 && (
            <section>
              <h2 className="text-lg font-semibold mb-2 font-heading">
                2. Payment Method
              </h2>
              <PaymentMethod onComplete={handlePaymentComplete} />
            </section>
          )}
          {step === 3 && (
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Order Summary</h2>
              <OrderSummaryPage onComplete={handleOrderComplete} />
            </section>
          )}
        </div>
      </div>
      <AnimatePresence>
  {showOrderSuccessModal && (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={closeOrderSuccessModal} 
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          },
        }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} 
      >
       
        <button
          onClick={closeOrderSuccessModal}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl transition-transform transform hover:scale-110"
        >
          <RxCross2/>
        </button>
        <OrderSuccessPage/>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Checkout;
