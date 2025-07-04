import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const DatePicker = (props) => {
  const { label, name, valid, ...rest } = props;
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
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
            console.log(form);
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value}
                // selected={(value && new Date(value)) || new Date()}
                onChange={(val) => setFieldValue(name, val)}
                showTimeSelect
                // dateFormat="Pp"
                isClearable
                selectsStart
                // selectsRange
                // inline
                // showMonthDropdown
                // useShortMonthInDropdown
                // showMonthYearDropdown
                closeOnScroll={true}
                minDate={new Date()}
              />
            );
          }}
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </div>
    </>
  );
};

export default DatePicker;
