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
import { Field, FieldArray } from "formik";
import { getAllSubcategoryByCategoryData } from "../../../services/SubcategoryService";
import { getAllBrandBySubcategoryData } from "../../../services/BrandService";

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
  console.log("editData product", editData.gender);
  console.log("editData size", editData.size);

  const [subcategory, setSubcategory] = useState();

  const [brands, setBrands] = useState();

  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);
  // console.log("one", editData.brand.name);

  const { category } = useSelector((state: RootState) => state.allcategory);

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
    // metaTitle: editData?.metaTitle || "",
    // metaDescription: editData?.metaDescription || "",
    colors: editData?.colors || [],
    gender: Array.isArray(editData?.gender)
      ? editData.gender.map((g: any) =>
          typeof g === "string" ? { label: g, value: g } : g
        )
      : [],

    size: Array.isArray(editData?.size)
      ? editData.size.map((s: any) =>
          typeof s === "string" ? { label: s, value: s } : s
        )
      : [],

    attributes: Array.isArray(editData?.attributes)
      ? editData.attributes
      : typeof editData?.attributes === "string"
      ? JSON.parse(editData.attributes)
      : [],
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
      // Gender
      values.gender?.forEach((g) => formData.append("gender", g?.value || g));

      // Size
      values.size?.forEach((s) => formData.append("size", s?.value || s));

      // Color - safely handle string or array
      formData.append(
        "colors",
        Array.isArray(values.colors) ? values.colors.join(",") : values.colors
      );

      // Attributes - send as JSON string
      formData.append("attributes", JSON.stringify(values.attributes));

      console.log("Attributes JSON:", JSON.stringify(values.attributes));
      console.log("Colors:", values.colors);

      if (values.image && values.image.length > 0) {
        values.image.forEach((file) => {
          formData.append("image", file);
        });
      }

      console.log(values.image); // ✅ yahan FileList milna chahiye

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

  const fetchSubcategoryByCategory = async (categoryId: string) => {
    try {
      const res = await getAllSubcategoryByCategoryData(categoryId);
      setSubcategory(res); // Store in local state
    } catch (err) {
      console.error("Failed to fetch subcategories by category", err);
      setSubcategory([]);
    }
  };

  const ftchBrandBySubcategory = async (subcategoryID: string) => {
    try {
      const res = await getAllBrandBySubcategoryData(subcategoryID);
      setBrands(res); // Store in local state
    } catch (err) {
      console.error("Failed to fetch subcategories by category", err);
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
          console.log(formik.values.category);
          useEffect(() => {
            if (formik.values.category) {
              fetchSubcategoryByCategory(formik.values.category); // 👈 Fetch subcategories
            }
          }, [formik.values.category]);
          useEffect(() => {
            if (formik.values.subcategory) {
              ftchBrandBySubcategory(formik.values.subcategory);
            }
          }, [formik.values.subcategory]);

          const selectedCategory = category.find(
            (cat: any) => cat._id === formik.values.category
          );

          const isFashionOrFootwear =
            selectedCategory?.name === "Fashion" ||
            selectedCategory?.name === "Footwear";

          return (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormikControl
                  control="input"
                  type="text"
                  label="Product Name"
                  name="name"
                  placeholder="Enter product name"
                />
                <FormikControl
                  control="images"
                  label="Select Images"
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
                        subcategory?.map((sub: any) => ({
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

                {isFashionOrFootwear && (
                  <>
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
                  </>
                )}

                {/* Optional: color can be available for all */}
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

              <div className="space-y-1">
                <label className="block text-sm font-body text-gray-950 ">
                  Attributes
                </label>

                <FieldArray name="attributes">
                  {(fieldArrayHelpers) => (
                    <div className="space-y-3">
                      {formik.values.attributes.map((attr, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Field
                            name={`attributes[${index}].key`}
                            placeholder="Attribute name (e.g., Material)"
                            className="w-full focus:border-none 
                            rounded-sm border  text-gray-800 text-[13px] font-body border-black/10
                            "
                          />
                          <Field
                            name={`attributes[${index}].value`}
                            placeholder="Value (e.g., Synthetic)"
                            className="w-full focus:border-none 
                           rounded-sm border  text-gray-800 text-[13px] font-body border-black/10"
                          />
                          <button
                            type="button"
                            className="text-red-600 "
                            onClick={() => fieldArrayHelpers.remove(index)}
                          >
                            <RxCross2 className=" text-xl" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          fieldArrayHelpers.push({ key: "", value: "" })
                        }
                        className="border border-orange-600 text-orange-500 rounded text-sm p-2"
                      >
                        + Add Attribute
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 
                  rounded "
                >
                  {formik.isSubmitting ? "Submitting..." : "Edit Product"}
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
