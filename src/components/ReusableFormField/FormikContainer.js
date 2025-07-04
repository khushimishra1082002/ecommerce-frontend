import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import DatePicker from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";

const dropdownOptions = [
  { key: "Select an Option", value: "" },
  { key: "Option 1", value: "Option1" },
  { key: "Option 2", value: "Option2" },
  { key: "Option 3", value: "Option3" },
  { key: "Option 4", value: "Option4" },
];

const radioOptions = [
  { key: "Option 1", value: "one" },
  { key: "Option 2", value: "two" },
  { key: "Option 3", value: "three" },
];

const checkboxOptions = [
  { key: "Option 1", value: "cone" },
  { key: "Option 2", value: "ctwo" },
  { key: "Option 3", value: "cthree" },
];

const reactSelectOption = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const reactMultiSelectOption = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// For Image
const supportedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/png",
];
const maxImageSize = 5 * 1024 * 1024; // 5MB in bytes

// For File
const supportedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

const FormikContainer = () => {
  const [formKey, setFormKey] = useState(0);
  const [formValues, setFormValues] = useState(null);

  const initialValues = {
    fullName: "",
    age: "",
    pass: "",
    cpass: "",
    tc: false,
    email: "",
    normalDate: "",
    comment: "",
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,
    selectedDate: new Date(),
    reactSelect: null,
    reactMulitSelect: [],
    image: null,
    images: [],
    file: null,
    files: [],
  };

  const data = {
    fullName: "Roshan Rana",
    age: "28",
    pass: "Roshan1995@",
    cpass: "Roshan1995@",
    tc: true,
    email: "ranaroshan763@gmail.com",
    normalDate: "2023-08-29",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum consequuntur eligendi vero cumque necessitatibus culpa modi ex harum maxime odit corporis veritatis unde sunt odio quidem, numquam obcaecati facere minus.",
    selectOption: "Option4",
    radioOption: "one",
    checkboxOption: ["cone", "ctwo"],
    birthDate: null,
    selectedDate: null,
    reactSelect: { value: "strawberry", label: "Strawberry" },
    reactMulitSelect: [
      { label: "Chocolate", " value": "chocolate" },
      { value: "strawberry", label: "Strawberry" },
    ],
    image: null,
    images: [],
    file: null,
    files: [],
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("From Data", values);
    console.log("Saved Data", JSON.parse(JSON.stringify(values)));
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    setFormKey((prevKey) => prevKey + 1);
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().min(3).max(30).required("Required"),
    age: Yup.number()
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .min(18, "You must be at least 18 years old")
      .max(100, "Age cannot be more than 100")
      .required("Required"),
    pass: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    cpass: Yup.string()
      .oneOf([Yup.ref("pass"), null], "Passwords must match")
      .required("Confirm Password is required"),
    email: Yup.string().email("Invalie email formate").required("Required"),
    normalDate: Yup.date()
      .nullable()
      .required("Birthdate is required")
      .max(new Date(), "Birthdate cannot be in the future"),
    comment: Yup.string().min(50).required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOption: Yup.string().required("Select an option"),
    checkboxOption: Yup.array()
      .required("At least one option must be selected")
      .min(2, "Select at least two options"),

    birthDate: Yup.date().required("Required").nullable(),

    selectedDate: Yup.date().nullable().required("Date is required"),

    reactSelect: Yup.object().nullable().required("Select an option"),

    // reactSelect: Yup.object().shape({
    //   label: Yup.string().required("Select an option"),
    //   value: Yup.string().required("Select an option"),
    // }),

    reactMulitSelect: Yup.array()
      .min(1, "Select at least one option")
      .required("Select at least one option"),

    // reactSelect: Yup.mixed()
    //   .required()
    //   .oneOf(["chocolate", "strawberry"])
    //   .label("Selected Country"),
    // reactMultiSelect: Yup.object().required("Required"),
    // reactMultiSelect: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       value: Yup.string().required(),
    //       label: Yup.string().required(),
    //     })
    //   )
    //   .required("Required"),
    // image: Yup.mixed()
    //   .required("Image is required")
    //   .test("imageType", "Unsupported image type", (value) => {
    //     if (value) {
    //       return supportedImageTypes.includes(value.type);
    //     }
    //     return true; // Allow empty value (no image selected)
    //   })
    //   .test("imageSize", "Image size is too large", (value) => {
    //     if (value) {
    //       return value.size <= maxImageSize;
    //     }
    //     return true; // Allow empty value (no image selected)
    //   }),
    // file: Yup.mixed()
    //   .required("File is required")
    //   .test("fileType", "Unsupported file type", (value) => {
    //     if (value) {
    //       return supportedFileTypes.includes(value.type);
    //     }
    //     return true; // Allow empty value (no file selected)
    //   })
    //   .test("fileSize", "File size is too large", (value) => {
    //     if (value) {
    //       return value.size <= maxFileSize;
    //     }
    //     return true; // Allow empty value (no file selected)
    //   }),
  });

  return (
    <>
      <div className="flex h-full w-full  justify-center ">
        <Formik
          initialValues={formValues || initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
          //   validateOnMount
        >
          {(formik) => {
            console.log("Formik", formik);
            return (
              <Form className="flex w-10/12 flex-col gap-4">
                {/* Name */}
                <FormikControl
                  control="input"
                  type="text"
                  label="FullName"
                  name="fullName"
                  valid={formik.errors.fullName && formik.touched.fullName}
                  placeholder="Enter Your FullName"
                />

                {/* Number */}
                <FormikControl
                  control="input"
                  type="number"
                  label="Enter Your Age"
                  name="age"
                  valid={formik.errors.age && formik.touched.age}
                  placeholder="Enter Your Age"
                />

                {/* Password */}
                <FormikControl
                  control="input"
                  type="password"
                  label="Password"
                  name="pass"
                  valid={formik.errors.pass && formik.touched.pass}
                  placeholder="****"
                />

                {/*Confirm Password */}
                <FormikControl
                  control="input"
                  type="password"
                  label="Confirm Password"
                  name="cpass"
                  valid={formik.errors.cpass && formik.touched.cpass}
                  placeholder="****"
                />

                {/* Single CheckBox */}
                <FormikControl
                  control="singlecheckbox"
                  label="Accept Term And condition"
                  name="tc"
                  valid={formik.errors.tc && formik.touched.tc}
                />

                {/* Email */}
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                  valid={formik.errors.email && formik.touched.email}
                  placeholder="Enter Your Email"
                />

                {/* Normal Date */}
                <FormikControl
                  control="input"
                  type="date"
                  label="Enter Your Date"
                  name="normalDate"
                  valid={formik.errors.normalDate && formik.touched.normalDate}
                  placeholder="Enter Your Date"
                />

                {/* TextArea */}
                <FormikControl
                  control="textarea"
                  label="Enter Your Comment"
                  name="comment"
                  valid={formik.errors.comment && formik.touched.comment}
                  placeholder="Enter Your Comment"
                  rows="2"
                />
                {/* Select */}
                {/* control = 'select' label="Select a topic", name="selectOption", option=[{key,value}] */}
                <FormikControl
                  control="select"
                  label="Select A Topic"
                  name="selectOption"
                  options={dropdownOptions}
                  valid={
                    formik.errors.selectOption && formik.touched.selectOption
                  }
                />
                {/* Radio Button */}
                <FormikControl
                  control="radio"
                  label="This is Radio"
                  name="radioOption"
                  options={radioOptions}
                  valid={
                    formik.errors.radioOption && formik.touched.radioOption
                  }
                />
                {/* CheckBox */}
                <FormikControl
                  control="checkbox"
                  label="This is Checkbox"
                  name="checkboxOption"
                  options={checkboxOptions}
                  valid={
                    formik.errors.checkboxOption &&
                    formik.touched.checkboxOption
                  }
                />
                {/* DatePicker */}
                <FormikControl
                  control="date"
                  label="Pick a date"
                  name="birthDate"
                  valid={formik.errors.birthDate && formik.touched.birthDate}
                />

                {/* React DatePicker */}
                <div>
                  <label>Select a date:</label>
                  <DatePicker
                    name="selectedDate"
                    selected={formik.values.selectedDate}
                    onChange={(date) =>
                      formik.setFieldValue("selectedDate", date)
                    }
                    onBlur={formik.handleBlur("selectedDate")}
                    dateFormat="MM/dd/yyyy"
                  />
                  {formik.touched.selectedDate && formik.errors.selectedDate ? (
                    <div className="error">{formik.errors.selectedDate}</div>
                  ) : null}
                </div>

                {/* React select */}
                <FormikControl
                  control="reactselect"
                  label="React Select One Option"
                  name="reactSelect"
                  options={reactSelectOption}
                  valid={
                    formik.errors.reactSelect && formik.touched.reactSelect
                  }
                />
                {/* React Multi Select */}
                <FormikControl
                  control="reactmultiselect"
                  label="React Multi Select  Option"
                  name="reactMulitSelect"
                  options={reactMultiSelectOption}
                  valid={
                    formik.errors.reactMulitSelect &&
                    formik.touched.reactMulitSelect
                  }
                />

                {/* Image */}
                <FormikControl
                  control="image"
                  label="Select Single Image"
                  name="image"
                  key={formKey}
                  valid={formik.errors.image && formik.touched.image}
                />

                {/* File */}
                <FormikControl
                  control="file"
                  label="Select Single File"
                  name="file"
                  key1={formKey}
                  valid={formik.errors.file && formik.touched.file}
                />

                {/* Multi images */}
                <FormikControl
                  control="images"
                  label="Select Multiple Images"
                  name="images"
                  key2={formKey}
                  valid={formik.errors.images && formik.touched.images}
                />

                {/* Multiple Files */}
                <FormikControl
                  control="files"
                  label="Select Multiple Files"
                  name="files"
                  key3={formKey}
                  valid={formik.errors.files && formik.touched.files}
                />
                {/* Load sAved Data */}
                <button
                  className="bg-blue-500 p-4 rounded active:text-white"
                  type="button"
                  onClick={() => setFormValues(data)}
                >
                  Load Saved Data
                </button>

                <button
                  className="px-4 py-2 rounded bg-blue-500 active:text-white disabled:bg-red-500 disabled:cursor-not-allowed"
                  disabled={!formik.isValid || formik.isSubmitting}
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default FormikContainer;
