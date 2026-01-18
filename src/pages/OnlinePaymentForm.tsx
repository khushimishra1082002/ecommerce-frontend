import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import FormikControl from "../components/ReusableFormField/FormikControl";
import { setPaymentDetails } from "../ReduxToolkit/Slices/PaymentSlice";
import * as Yup from "yup";

const initialValues = {
  upiId: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

interface OnlinePaymentFormProps {
  onComplete?: () => void;
}


const validationSchema = Yup.object({
  upiId: Yup.string()
    .matches(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID")
    .required("UPI ID is required"),

  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),

  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
    .required("Expiry date is required"),

  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),
});

const OnlinePaymentForm: React.FC<OnlinePaymentFormProps> = ({ onComplete }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-50 border border-gray-200 p-5 rounded">
      <h2 className="text-md font-heading font-semibold mb-4">Enter Payment Details</h2>
      <Formik
        initialValues={initialValues}
         validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          dispatch(setPaymentDetails(values));
          if (onComplete) onComplete(); // ✅ Only dispatching, not placing order
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormikControl
                control="input"
                type="text"
                label="UPI ID"
                name="upiId"
                placeholder="example@upi"
              />
              <FormikControl
                control="input"
                type="text"
                label="Card Number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
              />
              <FormikControl
                control="input"
                type="text"
                label="Expiry Date"
                name="expiry"
                placeholder="MM/YY"
              />
              <FormikControl
                control="input"
                type="password"
                label="CVV"
                name="cvv"
                placeholder="123"
              />
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="bg-black text-sm font-heading my-2
             text-white font-medium py-2 px-4 rounded-lg"
            >
              {formik.isSubmitting ? "Processing..." : "Save Payment Info"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OnlinePaymentForm;
