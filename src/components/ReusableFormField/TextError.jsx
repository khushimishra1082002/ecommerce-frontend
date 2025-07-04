import React from "react";

const TextError = (props) => {
  return (
    <>
      <div className="text-red-500 text-[12px] font-heading">{props.children}</div>
    </>
  );
};

export default TextError;
