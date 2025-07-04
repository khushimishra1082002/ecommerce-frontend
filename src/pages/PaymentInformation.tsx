import React from "react";

const PaymentInformation = () => {
  return (
    <>
      <div className="bg-white space-y-3 p-6 shadow">
        <h2 className=" text-lg font-body font-medium">Payment Information</h2>
        <form className="grid grid-cols-1 gap-3 ">
          <div
            className="
            flex flex-col gap-1 "
          >
            <label className=" text-sm font-body text-gray-950">
              Cardholder Name:
            </label>
            <input
              className="rounded-sm border border-black/15
               font-heading text-gray-400 text-[13px]"
              type="text"
              placeholder="Cardholder Name:"
            />
          </div>
          <div
            className="
            flex flex-col gap-1 "
          >
            <label className=" text-sm font-body text-gray-950">
              cardNumber:
            </label>
            <input
              className="rounded-sm border border-black/15
               font-heading text-gray-400 text-[13px]"
              type="text"
              placeholder="cardNumber:"
            />
          </div>

          <div
            className="
            flex flex-col gap-1 "
          >
            <label className=" text-sm font-body text-gray-950">
              Expiration Date (MM/YY):
            </label>
            <input
              className="rounded-sm border border-black/15
               font-heading text-gray-400 text-[13px]"
              type="text"
              placeholder="expDate:"
            />
          </div>
          <div
            className="
            flex flex-col gap-1 "
          >
            <label className=" text-sm font-body text-gray-950">CVV:</label>
            <input
              className="rounded-sm border border-black/15
               font-heading text-gray-400 text-[13px]"
              type="text"
              placeholder="CVV"
            />
          </div>
        </form>
        <div className="w-full">
          <button
            className="bg-black font-medium text-white p-3
           font-body rounded-md text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentInformation;
