import * as Yup from "yup";

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string(),
  isActive: Yup.boolean()
    .oneOf([true, false], "Status is required")
    .required("Status is required"),
});
