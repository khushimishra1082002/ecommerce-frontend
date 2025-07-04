import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { ProductFormDTO } from "../../../types/product";
import { productValidationSchema } from "../../../Validations/productValidations";
import { RxCross2 } from "react-icons/rx";
import { CreateProductData } from "../../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import FormikControl from "../../../components/ReusableFormField/FormikControl";
import { fetchSubcategories } from "../../../ReduxToolkit/Slices/SubcategorySlice";
import { fetchBrands } from "../../../ReduxToolkit/Slices/BrandSlice";
import { fetchAllProducts } from "../../../ReduxToolkit/Slices/ProductSlice";

interface AddProductProps {
  closeAddProductModal: () => void;
}

const initialValues: ProductFormDTO = {
  name: "",
  slug: "",
  description: "",
  image: [],
  price: 0,
  stock: 0,
  inStock: true,
  discount: 0,
  isFeatured: false,
  category: "",
  subcategory: "",
  brand: "",
  isActive: true,
  metaTitle: "",
  metaDescription: "",
  colors: [],
  gender: [],
  size: [],
};

const InStock = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const IsFeatured = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const IsActive = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const AddProduct: React.FC<AddProductProps> = ({ closeAddProductModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);

  const { category } = useSelector((state: RootState) => state.allcategory);
  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );
  const {
    brands,
    loading: brandLoading,
    error: brandError,
  } = useSelector((state: RootState) => state.brand);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onSubmit = async (
    values: ProductFormDTO,
    actions: FormikHelpers<ProductFormDTO>
  ) => {
    try {
      console.log("Formik values:", values);

      const formData = new FormData();

      // Append basic fields
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("stock", values.stock.toString());
      formData.append("inStock", String(values.inStock));
      formData.append("discount", values.discount.toString());
      formData.append("isFeatured", String(values.isFeatured));
      formData.append("category", values.category || "");
      formData.append("subcategory", values.subcategory || "");
      formData.append("brand", values.brand || "");
      formData.append("isActive", String(values.isActive));

      // Append multi-select fields
      values.gender?.forEach((g) => formData.append("gender", g));
      values.size?.forEach((s) => formData.append("size", s));

      // Append image (assuming single image upload)
      if (values.image && values.image.length > 0) {
        formData.append("image", values.image[0]); // single file
      }

      // 🔥 Call API
      const response = await CreateProductData(formData); // <-- send FormData

      console.log("API Response:", response);

      if (response.ok) {
        alert("Product added successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1);
        closeAddProductModal();
        dispatch(fetchAllProducts())
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An error occurred");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={closeAddProductModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">
        Add New Product
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={productValidationSchema}
      >
        {(formik) => {
          console.log(formik.values.category);

          // ✅ This useEffect is now valid
          useEffect(() => {
            if (formik.values.category) {
              dispatch(fetchSubcategories(formik.values.category));
              dispatch(fetchBrands(formik.values.category));
              console.log(
                "Fetching subcategories for category:",
                formik.values.category
              );
            }
          }, [formik.values.category]);

          return (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormikControl
                  control="input"
                  type="text"
                  label="Product Name"
                  name="name"
                  placeholder="Enter product name"
                />
                <FormikControl
                  control="image"
                  label="Select Single Image"
                  name="image"
                  key={formKey}
                  valid={formik.errors.image && formik.touched.image}
                />
                <FormikControl
                  control="input"
                  type="number"
                  label="Price"
                  name="price"
                  placeholder="Enter product price"
                />
                <FormikControl
                  control="input"
                  type="number"
                  label="Discount"
                  name="discount"
                  placeholder="Enter product discount"
                />
                <FormikControl
                  control="input"
                  type="number"
                  label="Stock"
                  name="stock"
                  placeholder="Enter product stock"
                />

                <FormikControl
                  control="select"
                  label="Select Category"
                  name="category"
                  options={
                    category?.map((cat: any) => ({
                      label: cat.name,
                      value: cat._id,
                    })) || []
                  }
                />

                {formik.values.category && (
                  <>
                    <FormikControl
                      control="select"
                      label="Select a subcategory"
                      name="subcategory"
                      options={
                        subcategories?.map((sub: any) => ({
                          label: sub.name,
                          value: sub._id,
                        })) || []
                      }
                      valid={
                        formik.errors.subcategory && formik.touched.subcategory
                      }
                    />
                    <FormikControl
                      control="select"
                      label="Select a brand"
                      name="brand"
                      options={
                        brands?.map((brand: any) => ({
                          label: brand.name,
                          value: brand._id,
                        })) || []
                      }
                      valid={formik.errors.brand && formik.touched.brand}
                    />
                  </>
                )}

                <FormikControl
                  control="reactmultiselect"
                  label="Gender"
                  name="gender"
                  options={[
                    { label: "Men", value: "Men" },
                    { label: "Women", value: "Women" },
                    { label: "Boy", value: "Boy" },
                    { label: "Girl", value: "Girl" },
                    { label: "Unisex", value: "Unisex" },
                  ]}
                />

                <FormikControl
                  control="reactmultiselect"
                  label="Size"
                  name="size"
                  options={[
                    { label: "XS", value: "XS" },
                    { label: "S", value: "S" },
                    { label: "M", value: "M" },
                    { label: "L", value: "L" },
                    { label: "XL", value: "XL" },
                    { label: "XXL", value: "XXL" },
                  ]}
                />

                <FormikControl
                  control="input"
                  type="text"
                  label="Color"
                  name="colors"
                  placeholder="Enter product colour"
                />

                <FormikControl
                  control="select"
                  label="InStock"
                  name="inStock"
                  options={InStock}
                  valid={formik.errors.inStock && formik.touched.inStock}
                />

                <FormikControl
                  control="select"
                  label="Featured"
                  name="isFeatured"
                  options={IsFeatured}
                  valid={formik.errors.isFeatured && formik.touched.isFeatured}
                />

                <FormikControl
                  control="select"
                  label="Active"
                  name="isActive"
                  options={IsActive}
                  valid={formik.errors.isActive && formik.touched.isActive}
                />
              </div>

              <FormikControl
                control="textarea"
                label="Description"
                name="description"
                valid={formik.errors.description && formik.touched.description}
                placeholder="Enter Product description"
                rows="2"
              />

              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 
                  rounded "
                >
                  {formik.isSubmitting ? "Submitting..." : "Add Product"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddProduct;
