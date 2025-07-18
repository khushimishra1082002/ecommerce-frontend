import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { BrandFormDTO } from "../../../types/brand";
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
import { CreateBrandData } from "../../../services/BrandService";

interface AddProductProps {
  closeAddBrandModal: () => void;
}

const initialValues: BrandFormDTO = {
  _id: "",
  name: "",
  slug: "",
  category: "",
  subcategory: "",
  isActive: true,
};

const IsActive = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const AddBrand: React.FC<AddProductProps> = ({ closeAddBrandModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);

  const { category } = useSelector((state: RootState) => state.allcategory);
  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onSubmit = async (
    values: BrandFormDTO,
    actions: FormikHelpers<BrandFormDTO>
  ) => {
    try {
      console.log("Formik values:", values);

      const formData = new FormData();

      // ✅ Append correct fields
      formData.append("name", values.name);
      formData.append("category", values.category); // <-- use ID
      formData.append("subcategory", values.subcategory); // <-- use ID
      formData.append("isActive", String(values.isActive));

      if (values.slug?.trim()) {
        formData.append("slug", values.slug.trim());
      } else {
        const slug = values.name?.toLowerCase().replace(/\s+/g, "-");
        formData.append("slug", slug);
      }

      const response = await CreateBrandData(formData);

      console.log("API Response:", response);

      if (response.ok) {
        alert("Brand added successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1);
        closeAddBrandModal();
        dispatch(fetchBrands());
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(" API Error:", error.response?.data || error.message);
      alert(error.message || "An error occurred");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={closeAddBrandModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Add New Brand</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={productValidationSchema}
      >
        {(formik) => {
          console.log(formik.values.category);

          // ✅ This useEffect is now valid
          useEffect(() => {
            if (formik.values.category) {
              dispatch(fetchSubcategories(formik.values.category));
            }
          }, [formik.values.category]);

          return (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <FormikControl
                  control="input"
                  type="text"
                  label="Brand"
                  name="name"
                  placeholder="Enter brand name"
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
                  </>
                )}

                <FormikControl
                  control="select"
                  label="Active"
                  name="isActive"
                  options={IsActive}
                  valid={formik.errors.isActive && formik.touched.isActive}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 
                  rounded "
                >
                  {formik.isSubmitting ? "Submitting..." : "Add Brand"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBrand;
