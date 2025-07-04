import * as Yup from "yup";

export const brandValidationSchema  = Yup.object({
    name: Yup.string().required("name is required"),
})