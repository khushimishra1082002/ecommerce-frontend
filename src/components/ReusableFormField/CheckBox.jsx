import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const CheckBox = (props) => {
  const { label, name, options, valid, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 w-10/12 ">
      <label
        className={` font-semibold  ${
          !valid ? "text-green-500" : "text-red-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <div className="flex gap-3 items-center">
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <input
                    type="checkbox"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field?.value?.includes(option?.value)}
                  />
                  <label htmlFor={option.value}>{option.key}</label>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default CheckBox;
