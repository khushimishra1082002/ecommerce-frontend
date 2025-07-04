import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { AiFillEye } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";

const Password = (props) => {
  const { label, name, visible, hide, ...rest } = props;
  return (
    <>
      <div className="flex flex-col w-full gap-1">
        <label className="font-semibold" htmlFor={name}>
          {label}
        </label>
        <div className="relative w-full">
          <Field className="w-full" name={name} {...rest} />
          {hide ? (
            <AiFillEye
              onClick={() => visible()}
              className={`absolute inset-y-0 right-0 top-1/2  -translate-y-1/2 text-2xl mr-3
             ${hide ? "text-red-500" : "text-green-500"}`}
            />
          ) : (
            <FaEyeSlash
              onClick={() => visible()}
              className={`absolute inset-y-0 right-0 top-1/2  -translate-y-1/2 text-2xl mr-3
             ${hide ? "text-red-500" : "text-green-500"}`}
            />
          )}
        </div>
        <ErrorMessage name={name} component={TextError} />
      </div>
    </>
  );
};

export default Password;
