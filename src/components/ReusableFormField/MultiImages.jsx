import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const MultiImages = (props) => {
  const { label, name, placeholder, valid, key2, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 w-10/12">
      <label
        className={`text-sm font-body text-gray-950 ${
          !valid ? "" : "text-red-500"
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
              className="w-full rounded-sm border border-black/15 font-heading text-gray-800 text-[13px] p-2"
              name={name}
              type="file"
              onChange={(val) => {
                setFieldValue(name, Array.from(val.currentTarget.files));
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
