import React, { useState } from "react";
import { Form, Field, ErrorMessage, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import TextError from "../TextError";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const reactSelectOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const reactMultiSelectOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comment: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumber: ["", ""],
  phNumbers: [""],
  date: "",
  time: "",
  acceptTerms: false,
  password: "",
  reactSelect: null,
  reactMultiSelect: [],
};

const data = {
  name: "roshan rana",
  email: "ranaroshan763@gmail.com",
  date: "2023-08-29",
  time: "10:22",
  channel: "code evalution",
  comment: "welcom to formik",
  address: "MIG 171 3d saket nagar",
  social: {
    facebook: "http://rosha.twitter.com",
    twitter: "http://roshan.facebook.com",
  },
  phoneNumber: ["9753679813", "7974439538"],
  phNumbers: ["123456789", "0987654321"],
  color: "",
  acceptTerms: true,
};

const onSubmit = (values, onSubmitProps) => {
  console.log("Values", values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalie email formate").required("Required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    ),
  selectedOptions: Yup.array()
    .min(1, "Select at least one option")
    .required("Select at least one option"),
  reactSelect: Yup.object().nullable().required("Select an option"),
  reactMultiSelect: Yup.array()
    .min(1, "Select at least one option")
    .required("Select at least one option"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  channel: Yup.string().required("Required"),
  comment: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  // social: Yup.object().required("Required"),
  // twitter: Yup.string().required("Required"),
  // phoneNumber: Yup.array().min(1).of(Yup.string().trim().required("Required")),
});

const FormikNoReusable = () => {
  const [formValues, setFormValues] = useState(null);

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnMount
      >
        {(formik) => {
          console.log(formik);
          return (
            <Form className="flex flex-col w-10/12 m-auto  gap-3 ">
              {/* Name */}
              <div className="flex flex-col gap-2 ">
                <label
                  className={` font-semibold ${
                    !(formik.errors.name && formik.touched.name)
                      ? "text-black-500"
                      : "text-red-500"
                  }`}
                  htmlFor="name"
                >
                  Full Name
                </label>
                {/* Field Component renders HTML input element by default */}
                <Field
                  className={` focus:ring-0 focus:outline-none  ${
                    !(formik.errors.name && formik.touched.name)
                      ? "null "
                      : "border-red-500 bg-red-100"
                  }`}
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  name="name"
                />
                <ErrorMessage name="name" component={TextError} />
              </div>

              {/* Email */}
              <div className="w-full flex flex-col group duration-200">
                <label htmlFor="email">Email</label>
                <Field
                  className=""
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  title="Field"
                />
                <div className="text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* Date  And Time */}

              <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="date">Date:</label>
                  <Field type="date" id="date" name="date" />
                  <ErrorMessage name="date" component={TextError} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="time">Time:</label>
                  <Field type="time" id="time" name="time" />
                  <ErrorMessage name="time" component={TextError} />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 ">
                <label
                  className={` font-semibold ${
                    !(formik.errors.password && formik.touched.password)
                      ? "text-black-500"
                      : "text-red-500"
                  }`}
                  htmlFor="name"
                >
                  Enter Your Password
                </label>
                {/* Field Component renders HTML input element by default */}
                <Field
                  className={` focus:ring-0 focus:outline-none  ${
                    !(formik.errors.password && formik.touched.password)
                      ? "null "
                      : "border-red-500 bg-red-100"
                  }`}
                  type="password"
                  id="password"
                  placeholder="Enter Your Password"
                  name="password"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>

              {/* Checkbox Group */}
              <div className=" flex-col gap-2 flex">
                <label
                  className={` font-semibold ${
                    !(
                      formik.errors.selectedOptions &&
                      formik.touched.selectedOptions
                    )
                      ? "text-black-500"
                      : "text-red-500"
                  }`}
                >
                  Select Your Options:
                </label>
                <div className="flex gap-3 items-center">
                  {options.map((option) => (
                    <div className="flex gap-2 items-center">
                      <Field
                        type="checkbox"
                        name="selectedOptions"
                        value={option.value}
                      />
                      <label key={option.value}> {option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <ErrorMessage name="selectedOptions" component={TextError} />

              {/* Team And condition */}
              <div>
                <label className="flex gap-4 items-center">
                  <Field type="checkbox" name="acceptTerms" />
                  Accept Terms and Conditions
                </label>
                <ErrorMessage name="acceptTerms" component={TextError} />
              </div>

              {/* Channel */}
              <div className="flex flex-col gap-">
                <label htmlFor="channel">Channel</label>
                <Field
                  type="text"
                  id="channel"
                  name="channel"
                  placeholder="Enter Your Channel name"
                  maxLength="20"
                  minLength="4"
                  size="10"
                />
                <div className="text-red-500">
                  <ErrorMessage name="channel" className="" />
                </div>
              </div>

              {/* Comment */}
              <div className="flex flex-col gap-2">
                <label htmlFor="comment">Comment</label>
                <Field
                  className=""
                  as="textarea"
                  // component="textarea"
                  id="Comment"
                  name="comment"
                  placeholder="Enter Your Comment"
                  rows="3"
                  // For Individual validation
                  // validate={validateComment}
                />
                <div className="text-red-500">
                  <ErrorMessage name="comment" />
                </div>
              </div>

              {/* in Render Props Pattern we use funtion as children to the component */}
              <div>
                <label htmlFor="address">Address</label>
                <Field name="address" className="w-full">
                  {(props) => {
                    //Props == field, form, meta
                    // field == (name, onBlur, onChange)
                    // form == (every thing)
                    // field == (name, onBlur, onChange)

                    // console.log("Render props", props);
                    // Destructuring the props
                    const { field, form, meta } = props;

                    return (
                      <div>
                        <input
                          className="w-full "
                          placeholder="Enter Address"
                          type="text"
                          {...field}
                        />
                        {meta.touched && meta.error ? (
                          <div className="text-red-500 text-sm">
                            {meta.error}
                          </div>
                        ) : null}
                      </div>
                    );
                  }}
                </Field>
              </div>

              {/* Nested */}
              <div className="flex w-full gap-3">
                <div className="w-full flex flex-col group duration-200">
                  <label htmlFor="facebook">FaceBook Profile</label>
                  <Field type="text" name="social.facebook" />
                  <ErrorMessage name="social.facebook" component={TextError} />
                </div>

                <div className="w-full flex flex-col group duration-200">
                  <label htmlFor="twitter">Twitter Profile</label>
                  <Field type="text" name="social.twitter" />
                  <ErrorMessage name="twitter" component={TextError} />
                </div>
              </div>

              {/* ARRAY */}
              <div className="flex w-full gap-3">
                <div className="w-full flex flex-col group duration-200">
                  <label htmlFor="facebook">Primary Number</label>
                  <Field type="number" name="phoneNumber[0]" />
                  <ErrorMessage name="phoneNumber[0]" component={TextError} />
                </div>

                <div className="w-full flex flex-col group duration-200">
                  <label htmlFor="twitter">Secondary Number</label>
                  <Field type="number" name="phoneNumber[1]" />
                  <ErrorMessage name="phoneNumber[1]" component={TextError} />
                </div>
              </div>

              {/* Field Array component */}
              <div className="">
                <label htmlFor="phNumbers">List of Phone Numbers</label>
                <FieldArray name="phNumbers">
                  {/* RenderProps Patter */}
                  {(FieldArrayProps) => {
                    // console.log("FieldArrayProps", FieldArrayProps);
                    const { form, push, remove } = FieldArrayProps;
                    const { values } = form;
                    const { phNumbers } = values;
                    return (
                      <div>
                        {phNumbers.map((phNumber, index) => (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && (
                              <button
                                className="px-4 py-2 rounded bg-red-500"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}

                            <button
                              className={`px-4 py-2 rounded bg-green-500 ${
                                index > 5 ? "hidden" : "null"
                              } `}
                              type="button"
                              onClick={() => push("")}
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              {/* React Select */}
              <div>
                <label>React Select option:</label>
                <Field
                  name="reactSelect"
                  component={Select}
                  options={reactSelectOptions}
                  onChange={(reactSelect) => {
                    formik.setFieldValue("reactSelect", reactSelect);
                  }}
                  isClearable
                />
                <ErrorMessage name="reactSelect" component={TextError} />
              </div>

              {/* React Multi Select */}
              <div>
                <label>React Select option:</label>
                <Field
                  name="reactMultiSelect"
                  component={Select}
                  options={reactMultiSelectOptions}
                  onChange={(reactMultiSelect) => {
                    formik.setFieldValue("reactMultiSelect", reactMultiSelect);
                  }}
                  isClearable
                  isMulti
                />
                <ErrorMessage name="reactMultiSelect" component={TextError} />
              </div>

              {/* color */}
              {/* <div className="flex flex-col gap-2 ">
                <label
                  className={` font-semibold ${
                    !(formik.errors.color && formik.touched.color)
                      ? "text-black-500"
                      : "text-red-500"
                  }`}
                  htmlFor="name"
                >
                  Select Color
                </label>
                <Field
                  className={` focus:ring-0 focus:outline-none  ${
                    !(formik.errors.color && formik.touched.color)
                      ? "null "
                      : "border-red-500 bg-red-100"
                  }`}
                  type="color"
                  id="color"
                  placeholder="Choose Color"
                  name="color"
                />
                <ErrorMessage name="color" component={TextError} />
              </div> */}

              {/* Load sAved Data */}
              <button
                className="bg-blue-500 p-4 rounded active:text-white"
                type="button"
                onClick={() => setFormValues(data)}
              >
                Load Saved Data
              </button>

              {/* Reset The Form Data */}
              <button
                className="bg-pink-500 p-4 rounded active:text-white"
                type="reset"
              >
                Reset
              </button>

              <button
                type="submit"
                className={`px-2 py-4 rounded border disabled:bg-red-500 disabled:cursor-not-allowed bg-gray-300 ${
                  formik.isSubmitting || !formik.isValid ? "bg-red-300" : "null"
                }`}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormikNoReusable;
