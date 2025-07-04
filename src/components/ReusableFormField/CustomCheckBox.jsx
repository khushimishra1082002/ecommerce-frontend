import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const CustomCheckBox = (props) => {
  const { label, name, options, valid, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 w-10/12 ">
      <label className={` font-semibold`} htmlFor={name}>
        {label}
      </label>
      <div className="flex flex-col text-xs gap-1 items-start">
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      className="peer hidden "
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field?.value?.includes(option?.value)}
                    />
                    <label
                      className="peer-checked:border-blue-600 peer-checked:bg-skin-primary peer-checked:text-white peer-checked:border p-1 font-semibold border-skin-secondary border rounded-xl shadow"
                      htmlFor={option.value}
                    >
                      <div>{option.key}</div>
                    </label>
                  </div>
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

export default CustomCheckBox;
