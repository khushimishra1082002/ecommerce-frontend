import React from "react";

const FullPageLoader = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-sky-600 rounded-full animate-spin"></div>
      </div>
    </>
  );
};

export default FullPageLoader;
