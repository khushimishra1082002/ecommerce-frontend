import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const MultiImages = (props) => {
  const { label, name, placeholder, valid, key2, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 w-10/12">
      <label
        className={` font-semibold after:content['*'] ${
          !valid ? "text-green-500" : "text-red-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name} {...rest} key={key2}>
        {(props) => {
          const { form } = props;
          const { setFieldValue } = form;
          return (
            <input
              multiple
              className="w-full border-b-4 rounded-lg appearance-none border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-4 "
              name={name}
              type="file"
              onChange={(val) => {
                setFieldValue(name, val.currentTarget.files);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default MultiImages;
