import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../ReduxToolkit/app/Store";
import { CategoryFormDTO } from "../../../types/category";
import { categoryValidationSchema } from "../../../Validations/categoryValidations";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import FormikControl from "../../../components/ReusableFormField/FormikControl";
import { editCategoryData } from "../../../services/CategoryService";

interface EditCategoryProps {
  closeEditCategoryModal: () => void;
  editData: any;
}

const IsActive = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];


const EditCategory: React.FC<EditCategoryProps> = ({
  closeEditCategoryModal,
  editData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);

  const initialValues: CategoryFormDTO = {
    name: editData?.name || "",
    description: editData?.description || "",
    image: null,
    isActive: editData?.isActive ?? true,
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

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
      }

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await editCategoryData(editData._id, formData);

      if (response.ok) {
        alert("Category updated successfully");
        actions.resetForm();
        setFormKey((prev) => prev + 1);
        closeEditCategoryModal();
        dispatch(fetchAllCategory());
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
        onClick={closeEditCategoryModal}
        className="absolute top-2 right-2"
      >
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Edit Category</h2>

      <Formik
        enableReinitialize
        key={formKey}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={categoryValidationSchema}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {/* Existing image preview */}
              {editData?.image && (
                <div className="mb-2">
                  <label className="block font-medium mb-1">
                    Existing Image
                  </label>
                  <img
                    src={`http://localhost:5000/api/upload/${editData.image}`}
                    alt="Current category"
                    className="w-32 h-20 object-cover rounded"
                  />
                </div>
              )}

              <FormikControl
                control="input"
                type="text"
                label="Category Name"
                name="name"
                placeholder="Enter category name"
              />

              <FormikControl
                control="image"
                label="Select New Image (optional)"
                name="image"
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
              placeholder="Enter product description"
              rows="2"
            />

            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                {formik.isSubmitting ? "Submitting..." : "Edit Category"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCategory;
