import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const SingleCheckBox = (props) => {
  const { name, label, valid, text } = props;
  return (
    <>
      <div className="flex flex-col gap-1 w-full ">
        <label className={` font-semibold after:content['*'] }`} htmlFor={name}>
          {label}
        </label>
        <div className="flex gap-2 text-xs">
          <Field type="checkbox" name={name} id={name} label={label} />
          {text}
        </div>
        <ErrorMessage name="tc" component={TextError} />
      </div>
    </>
  );
};

export default SingleCheckBox;
