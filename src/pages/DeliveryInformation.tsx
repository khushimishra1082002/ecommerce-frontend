import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../components/ReusableFormField/Input";
import {
  postDeliveryInfoData,
  getDeliveryInfoData,
} from "../services/deliveryInfoService";
import { deliveryInfoValidationSchema } from "../Validations/deliveryInfovalidations";
import { DeliveryInfoDTO } from "../types/deliveryInformationDto";
import { decodeToken } from "../utils/decodeToken";
import { DeliveryInfoFormDTO } from "../types/deliveryInformationDto";
import { FormikHelpers } from "formik";

interface DeliveryInformationProps {
  onComplete: () => void;
}

const DeliveryInformation: React.FC<DeliveryInformationProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [initialValues, setInitialValues] =
    useState<DeliveryInfoFormDTO | null>(null);

  const navigate = useNavigate();

  const decoded = decodeToken();
  console.log("decodeddd", decoded);

  const userId = decoded?.id;

  console.log("userId", userId);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getDeliveryInfoData();

        setInitialValues({
          fullname: data.fullname || "",
          email: data.email || "",
          phoneNo: data.phoneNo || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
          city: data.city || "",
          state: data.state || "",
          zip: data.zip || "",
        });
      } catch (err) {
        setInitialValues({
          fullname: "",
          email: "",
          phoneNo: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
        });
      }
    };

    fetchInfo();
  }, []);

  const handleSubmit = async (
    values: DeliveryInfoFormDTO,
    actions: FormikHelpers<DeliveryInfoFormDTO>,
  ) => {
    if (step < 2) {
      setStep(step + 1);
      actions.setTouched({});
      return;
    }

    try {
      await postDeliveryInfoData(values);
      alert("Post info successfully");
      onComplete();
    } catch {
      alert("Something went wrong while submitting delivery info");
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (!initialValues) return <p>Loading delivery info...</p>;

  return (
    <div className="flex flex-col gap-4 bg-white px-8 py-6 border border-black/10 rounded shadow">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold font-heading">
            Delivery Information
          </h1>
          <span className="text-gray-500 font-heading text-[13px]">
            Step {step} of 2
          </span>
        </div>
      </div>

      <Formik<DeliveryInfoFormDTO>
        initialValues={initialValues}
        validationSchema={deliveryInfoValidationSchema[step - 1]}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <Form className="space-y-4">
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
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-2">
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
                </div>
              </>
            )}

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
