import * as Yup from "yup";

export const subcategoryValidationSchema = Yup.object({
  name: Yup.string().required("name is required"),
});