import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { CategoryFormDTO } from "../../../types/category";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import FormikControl from "../../../components/ReusableFormField/FormikControl";
import { CreateCategoryData } from "../../../services/CategoryService";
import { categoryValidationSchema } from "../../../Validations/categoryValidations";

interface AddCategoryProps {
  closeAddCategoryModal: () => void;
}

const initialValues: CategoryFormDTO = {
  name: "",
  description: "",
  image: null,
  isActive: true,
};

const IsActive = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

const AddCategory: React.FC<AddCategoryProps> = ({ closeAddCategoryModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);

  const onSubmit = async (
    values: CategoryFormDTO,
    actions: FormikHelpers<CategoryFormDTO>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description ?? "");
      formData.append("isActive", String(values.isActive));

      if (values.image) {
        formData.append("image", values.image);
      } else {
        alert("Image is required");
        return;
      }

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await CreateCategoryData(formData);

      if (response.ok) {
        alert("Category added successfully");
        actions.resetForm();
        setFormKey((prevKey) => prevKey + 1);
        closeAddCategoryModal();
        dispatch(fetchAllCategory());
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Error submitting category:", error);
      alert(error.response?.data?.message || "Submission failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={closeAddCategoryModal}
        className="absolute top-2 right-2"
      >
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">
        Add New Category
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={categoryValidationSchema}
      >
        {(formik) => {
          return (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <FormikControl
                  control="input"
                  type="text"
                  label="Category Name"
                  name="name"
                  placeholder="Enter category name"
                />
                <FormikControl
                  control="image"
                  label="Select Single Image"
                  name="image"
                  key={formKey}
                  valid={formik.errors.image && formik.touched.image}
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
                  {formik.isSubmitting ? "Submitting..." : "Add Category"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCategory;
