import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/ReusableFormField/Input";
import { RxCross2 } from "react-icons/rx";
import { postDeliveryInfoData } from "../services/deliveryInfoService";
import { useNavigate } from "react-router-dom";

const DeliveryInformation = ({ closeModal }) => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate()

  const initialValues = {
    fullname: "",
    email: "",
    phoneNo: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  };

  const validationSchemas = [
    Yup.object({
      fullname: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNo: Yup.string()
        .matches(/^\d{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    }),
    Yup.object({
      address1: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      zip: Yup.string().required("Zip is required"),
    }),
  ];

  const handleSubmit = async (values, actions) => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      try {
        const res = await postDeliveryInfoData(values);
        console.log("res", res);
        alert("Post info successfully");
        closeModal();
        navigate("/orderSummaryPage")
      } catch (error) {
        console.error("Submission failed", error);
        alert("Something went wrong while submitting delivery info");
      }
    }
    actions.setTouched({});
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold font-heading">
            Delivery Information
          </h1>
          <span className="text-gray-500 font-heading text-[13px]">
            Step {step} of 2
          </span>
        </div>
        <RxCross2 className="text-lg cursor-pointer" onClick={closeModal} />
      </div>

      {/* Formik Wrapper */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step - 1]}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="space-y-4">
            {/* Step 1 */}
            {step === 1 && (
              <>
                <FormikControl
                  control="input"
                  type="text"
                  label="Full Name"
                  name="fullname"
                  placeholder="Enter full name"
                />
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Phone No"
                  name="phoneNo"
                  placeholder="Enter phone number"
                />
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <FormikControl
                  control="input"
                  type="text"
                  label="Address 1"
                  name="address1"
                  placeholder="Enter address"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Address 2"
                  name="address2"
                  placeholder="Enter address"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="City"
                  name="city"
                  placeholder="Enter city"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="State"
                  name="state"
                  placeholder="Enter state"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Zip Code"
                  name="zip"
                  placeholder="Enter zip code"
                />
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-between gap-3 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={!formik.isValid}
                className="bg-black text-white px-4 py-2 rounded w-full"
              >
                {step === 2 ? "Submit" : "Next"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryInformation;
