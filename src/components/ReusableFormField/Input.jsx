import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Input = (props) => {
  console.log(props);
  
  const { label, name, placeholder, valid, ...rest } = props;
  return (
    <>
      <div className="flex flex-col gap-1 w-full ">
        <label
          className={` text-sm font-body text-gray-950 ${
            !valid ? "" : "text-red-500 after:content['*']"
          }`}
          htmlFor={name}
        >
          {label}
        </label>
        <Field
          className={`w-full  focus:border-none 
            rounded-sm border border-black/15
               font-heading text-gray-800 text-[13px] ${
            !valid ? "" : "border-red-500"
          }
           ${
             !valid
               ? "focus:ring-green-500 focus:ring-2"
               : "focus:ring-red-500 focus:ring-2"
           } `}
          id={name}
          name={name}
          placeholder={placeholder}
          {...rest}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </>
  );
};

export default Input;
