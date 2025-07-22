import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { SubcategoryFormDTO } from "../../../types/subcategory";
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
import { CreateSubcategoryData } from "../../../services/SubcategoryService";
import { subcategoryValidationSchema } from "../../../Validations/subcategoryValidations";

interface AddSubcategoryProps {
  closeAddSubcategoryModal: () => void;
}

const initialValues: SubcategoryFormDTO = {
  _id: "",
  name: "",
  slug: "",
  description: "",
  category: "",
  isActive: true,
};

const IsActive = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const AddSubcategory: React.FC<AddSubcategoryProps> = ({
  closeAddSubcategoryModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);

  const { category } = useSelector((state: RootState) => state.allcategory);

  
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onSubmit = async (
    values: SubcategoryFormDTO,
    actions: FormikHelpers<SubcategoryFormDTO>
  ) => {
    try {
      console.log("Formik values:", values);

      const formData = new FormData();

      // Append basic fields
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category || "");
      formData.append("isActive", String(values.isActive));


      const response = await CreateSubcategoryData(formData); 

      console.log("API Response:", response);

      if (response.ok) {
        alert("Subcategory added successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1);
        closeAddSubcategoryModal();
        dispatch(fetchSubcategories());
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
      <button
        onClick={closeAddSubcategoryModal}
        className="absolute top-2 right-2"
      >
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">
        Add New Subcategory
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={subcategoryValidationSchema}
      >
        {(formik) => {
          return (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <FormikControl
                  control="input"
                  type="text"
                  label="Subcategory Name"
                  name="name"
                  placeholder="Enter subcategory name"
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
                  {formik.isSubmitting ? "Submitting..." : "Add Subcategory"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddSubcategory;
