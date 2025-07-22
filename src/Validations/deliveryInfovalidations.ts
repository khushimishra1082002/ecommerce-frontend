import * as Yup from "yup";

 export const deliveryInfoValidationSchema = [
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