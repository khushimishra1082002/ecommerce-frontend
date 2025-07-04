import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Select from "react-select";

const ReactSelect = (props) => {
  const { label, name, options, valid, ...rest } = props;
  return (
    <div className="flex flex-col ">
      <label
        className={` font-semibold after:content['*'] ${
          !valid ? "text-green-500" : "text-red-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <Select
              id={name}
              {...field}
              {...rest}
              value={value}
              // value={options.find((c) => c.value === value)}
              onChange={(val) => setFieldValue(name, val)}
              options={options}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default ReactSelect;
