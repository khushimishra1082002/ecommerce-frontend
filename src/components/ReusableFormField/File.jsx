import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const File = (props) => {
  const { label, name, placeholder, valid, key1, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 ">
      <label
        className={` font-semibold after:content['*'] ${
          !valid ? "text-green-500" : "text-red-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name} key={key1} {...rest}>
        {(props) => {
          const { form } = props;
          const { setFieldValue } = form;
          return (
            <input
              // multiple
              className="w-full border-b-4 border-l-4 border-r-4 rounded-lg appearance-none border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-4 "
              name={name}
              type="file"
              onChange={(val) => {
                setFieldValue(name, val.target.files[0]);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default File;
