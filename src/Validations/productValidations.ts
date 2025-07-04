import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Price is required"),
  // image: Yup.string().required("Image is required"),
  stock: Yup.string().required("Stock is required"),
  inStock: Yup.string().required("InStock is required"),
  discount: Yup.string().required("Discount is required"),
 category: Yup.string()
  .nullable()
  .required("Category is required")
  .notOneOf([""], "Please select a category"),

subcategory: Yup.string()
  .nullable()
  .required("Subcategory is required")
  .notOneOf([""], "Please select a subcategory"),

brand: Yup.string()
  .nullable()
  .required("Brand is required")
  .notOneOf([""], "Please select a brand"),


});