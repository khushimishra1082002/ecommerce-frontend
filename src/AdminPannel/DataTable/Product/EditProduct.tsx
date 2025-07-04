// import React, { useEffect } from "react";

// const EditProduct = ({ closeEditProductModal, editData }) => {
//   useEffect(() => {
//     console.log("Edit Modal Data:", editData); // ✅ confirm it's coming
//   }, [editData]);

//   if (!editData) return <div>Loading product data...</div>;

//   return (
//     <div>
//       <h2 className="text-lg font-bold mb-4">Edit Product</h2>
//       <p>Product Name: {editData.name}</p>
//       <p>Price: ₹{editData.price}</p>
//       {/* Add your actual form here with Formik and initialValues using editData */}
//       <button
//         onClick={closeEditProductModal}
//         className="bg-red-500 px-4 py-2 text-white mt-4"
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default EditProduct;

import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { ProductFormDTO } from "../../../types/product";
import { productValidationSchema } from "../../../Validations/productValidations";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import { fetchSubcategories } from "../../../ReduxToolkit/Slices/SubcategorySlice";
import { fetchBrands } from "../../../ReduxToolkit/Slices/BrandSlice";
import { fetchAllProducts } from "../../../ReduxToolkit/Slices/ProductSlice";
import FormikControl from "../../../components/ReusableFormField/FormikControl";
import { editProductData } from "../../../services/ProductService";

interface EditProductProps {
  closeEditProductModal: () => void;
  editData: any;
}

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

const EditProduct: React.FC<EditProductProps> = ({
  closeEditProductModal,
  editData,
}) => {
  console.log("editData product", editData);

  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);
  // console.log("one", editData.brand.name);

  const { category } = useSelector((state: RootState) => state.allcategory);
  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );
  const { brands } = useSelector((state: RootState) => state.brand);

  const initialValues: ProductFormDTO = {
    name: editData?.name || "",
    slug: editData?.slug || "",
    description: editData?.description || "",
    image: [], // we'll allow new image selection if needed
    price: editData?.price || 0,
    stock: editData?.stock || 0,
    inStock: editData?.inStock?.toString() || "true",
    discount: editData?.discount || 0,
    isFeatured: editData?.isFeatured?.toString() || "false",
    category: editData?.category?._id || "",
    subcategory: editData?.subcategory?._id || "",
    brand: editData?.brand?._id || "",
    isActive: editData?.isActive?.toString() || "true",
    metaTitle: editData?.metaTitle || "",
    metaDescription: editData?.metaDescription || "",
    colors: editData?.colors || [],
    gender: editData?.gender || [],
    size: editData?.size || [],
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onSubmit = async (
    values: ProductFormDTO,
    actions: FormikHelpers<ProductFormDTO>
  ) => {
    console.log("values", values);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("stock", values.stock.toString());
      // formData.append("inStock", values.inStock);
      formData.append("discount", values.discount.toString());
      // formData.append("isFeatured", values.isFeatured);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      formData.append("brand", values.brand);
      console.log("Submitting Brand:", values.brand); // ✅ should be string

      // formData.append("isActive", values.isActive);

      values.gender.forEach((g) => formData.append("gender", g));
      values.size.forEach((s) => formData.append("size", s));
      if (values.image.length > 0) {
        formData.append("image", values.image[0]);
      }

      const response = await editProductData(editData._id, formData);

      console.log("kandy", response);

      if (response.ok) {
        alert("Product updated successfully");
        actions.resetForm();
        setFormKey((prev) => prev + 1);
        closeEditProductModal();
        dispatch(fetchAllProducts());
      } else {
        alert(response.message || "Update failed");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error occurred");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={closeEditProductModal}
        className="absolute top-2 right-2"
      >
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Edit Product</h2>

      <Formik
        enableReinitialize
        key={formKey}
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={productValidationSchema}
      >
        {(formik) => {
          useEffect(() => {
            if (formik.values.category) {
              dispatch(fetchSubcategories(formik.values.category));
              dispatch(fetchBrands(formik.values.category));
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
                  label="Select Image"
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
                  options={category.map((cat: any) => ({
                    label: cat.name,
                    value: cat._id,
                  }))}
                />
                {formik.values.category && (
                  <>
                    <FormikControl
                      control="select"
                      label="Select Subcategory"
                      name="subcategory"
                      options={subcategories.map((sub: any) => ({
                        label: sub.name,
                        value: sub._id,
                      }))}
                    />
                    <FormikControl
                      control="select"
                      label="Select Brand"
                      name="brand"
                      options={brands.map((brand: any) => ({
                        label: brand.name,
                        value: brand._id,
                      }))}
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
                  placeholder="Enter product color"
                />
                <FormikControl
                  control="select"
                  label="InStock"
                  name="inStock"
                  options={InStock}
                />
                <FormikControl
                  control="select"
                  label="Featured"
                  name="isFeatured"
                  options={IsFeatured}
                />
                <FormikControl
                  control="select"
                  label="Active"
                  name="isActive"
                  options={IsActive}
                />
              </div>

              <FormikControl
                control="textarea"
                label="Description"
                name="description"
                placeholder="Enter Product description"
                rows="2"
              />

              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 rounded"
                >
                  {formik.isSubmitting ? "Updating..." : "Update Product"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProduct;
