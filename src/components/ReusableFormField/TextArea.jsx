import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const TextArea = (props) => {
  const { label, name, placeholder, valid, ...rest } = props;
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <label
          className={`text-sm font-body text-gray-950 after:content['*'] ${
            !valid ? "null" : "text-red-500"
          }`}
          htmlFor={label}
        >
          {label}
        </label>
        <Field
          className={`w-full  focus:border-none 
            rounded-sm border border-black/15
               font-heading text-gray-800 text-[13px]  ${
            !valid ? "" : "border-red-500"
          }
           ${
             !valid
               ? "focus:ring-green-500 focus:ring-2"
               : "focus:ring-red-500 focus:ring-2"
           } `}
          as="textarea"
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

export default TextArea;
