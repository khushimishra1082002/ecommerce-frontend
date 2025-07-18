import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "../components/ReusableFormField/FormikControl";
import { RxCross2 } from "react-icons/rx";

interface OnlinePaymentFormProps {
  onClose: () => void;
  handlePlaceOrder: (paymentData: {
    upiId: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  }) => void;
}

const initialValues = {
  upiId: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const OnlinePaymentForm: React.FC<OnlinePaymentFormProps> = ({
  onClose,
  handlePlaceOrder,
}) => {
  return (
    <div className="relative">
      <button onClick={onClose} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Pay Now</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await handlePlaceOrder(values); // ✅ correct
            onClose();
          } catch (err) {
            alert("Something went wrong");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <FormikControl
                control="input"
                type="text"
                label="UPI ID"
                name="upiId"
                placeholder="Enter your UPI ID"
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
                label="Expiry"
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

            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                {formik.isSubmitting ? "Processing..." : "Submit Payment"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OnlinePaymentForm;
