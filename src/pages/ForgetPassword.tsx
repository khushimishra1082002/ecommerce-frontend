import React from "react";
import { FaLock } from "react-icons/fa";

const ForgetPassword = () => {
  return (
    <>
      <div className=" flex flex-col p-8 gap-6 w-8/12 m-auto border border-black/15 rounded shadow">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center">
            <FaLock className="text-xl text-green-400" />
            <h1 className="text-xl font-semibold font-heading">
              Forget Password
            </h1>
          </div>
          <span className="text-gray-500 font-heading text-[13px]">
            Reset Your Password
          </span>
        </div>

        <div className="w-full">
          <form className="space-y-5">
            <div
              className="
            flex flex-col gap-1 "
            >
              <label className=" text-sm font-body text-gray-950">
                Enter Password
              </label>
              <input
                className="rounded-sm border border-black/15
               font-heading text-gray-400 text-[13px]"
                type="text"
                placeholder="Enter Password"
              />
            </div>

            <div
              className="
            flex flex-col gap-1 "
            >
              <label className=" text-sm font-body text-gray-950">
                Confirm Password
              </label>
              <input
                className="rounded-sm border border-black/15
               font-heading text-gray-400 text-[13px]"
                type="text"
                placeholder="Confirm Password"
              />
            </div>
            <div className="w-full">
              <button
                className="bg-black font-medium text-white w-full p-3
           font-body rounded-md text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
