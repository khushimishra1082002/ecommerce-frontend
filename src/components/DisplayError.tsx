import React from "react";

interface DisplayErrorProps {
  message?: string;
}

const DisplayError: React.FC<DisplayErrorProps> = ({ message }) => {
  return (
    <div className="w-full h-60 flex justify-center items-center text-red-500 font-medium">
      {message || "Something went wrong. Please try again."}
    </div>
  );
};

export default DisplayError;
