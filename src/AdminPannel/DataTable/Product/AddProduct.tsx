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
import { Field, FieldArray } from "formik";
import { getAllSubcategoryByCategoryData } from "../../../services/SubcategoryService";
import { getAllBrandBySubcategoryData } from "../../../services/BrandService";

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
  attributes: [],
  // metaTitle: "",
  // metaDescription: "",
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
  // const { subcategories } = useSelector(
  //   (state: RootState) => state.subcategory
  // );
  const [subcategory, setSubcategory] = useState();

  const [brands, setBrands] = useState();

  console.log("brandsdata", brands);

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
      // Append arrays
      values.gender?.forEach((g) =>
        formData.append("gender", typeof g === "string" ? g : g.value)
      );

      values.size?.forEach((s) =>
        formData.append("size", typeof s === "string" ? s : s.value)
      );

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

      // 🔥 Call API
      const response = await CreateProductData(formData); // <-- send FormData

      console.log("API Response:", response);

      console.log(
        "Uploading images:",
        values.image.map((f) => f.name)
      );

      if (response.ok) {
        alert("Product added successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1);
        closeAddProductModal();
        dispatch(fetchAllProducts());
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
