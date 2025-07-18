import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Select = (props) => {
  const { label, name, options, placeholder, valid, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        className={`text-sm font-body text-gray-950 after:content-['*'] ${
          !valid ? "" : ""
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className={`w-full focus:border-none 
          rounded-sm border font-heading text-gray-800 text-[13px] ${
          !valid ? "border-black/10" : "border-black/10"
        } ${
          !valid
            ? "focus:ring-red-500 focus:ring-2"
            : "focus:ring-green-500 focus:ring-2"
        }`}
      >
        <option value="">Select {label}</option> {/* ✅ added */}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;
