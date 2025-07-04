import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import ReactSelect from "react-select";

const ReactMultiSelect = (props) => {
  const { label, name, options, valid, ...rest } = props;
  return (
    <div className="flex flex-col gap-1 ">
      <label
        className={`text-sm font-body text-gray-950 ${
          !valid ? "" : "text-red-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name} className ="w-full  focus:border-none 
            rounded-sm border border-black/15
               font-heading text-gray-800 text-[13px]">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <ReactSelect
              {...field}
              {...rest}
              isMulti={true}
              defaultValue={value}
              value={value}
              component={ReactSelect}
              onChange={(val) => setFieldValue(name, val)}
              options={options}
              className="w-full  focus:border-none 
            rounded-sm border border-black/15
               font-heading text-gray-800 text-[13px]"
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default ReactMultiSelect;

// npm i react-select
