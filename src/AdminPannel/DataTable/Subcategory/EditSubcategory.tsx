import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../ReduxToolkit/app/Store";
import { SubcategoryFormDTO } from "../../../types/subcategory";
import { subcategoryValidationSchema } from "../../../Validations/subcategoryValidations";
import { fetchAllCategory } from "../../../ReduxToolkit/Slices/CategorySlice";
import { fetchSubcategories } from "../../../ReduxToolkit/Slices/SubcategorySlice";
import FormikControl from "../../../components/ReusableFormField/FormikControl";
import { editSubcategoryData } from "../../../services/SubcategoryService";

interface EditSubcategoryProps {
  closeEditSubcategoryModal: () => void;
  editData: any;
}

const IsActive = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

const EditSubcategory: React.FC<EditSubcategoryProps> = ({
  closeEditSubcategoryModal,
  editData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formKey, setFormKey] = useState(0);
  const { category } = useSelector((state: RootState) => state.allcategory);

  const initialValues: SubcategoryFormDTO = {
    _id: "",
    name: editData?.name || "",
    slug: editData?.slug || "",
    description: editData?.description || "",
    category: editData?.category || "",
    isActive: editData?.isActive?.toString() || "true",
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onSubmit = async (
    values: SubcategoryFormDTO,
    actions: FormikHelpers<SubcategoryFormDTO>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      // formData.append("isActive", values.isActive);

      const response = await editSubcategoryData(editData._id, formData);

      if (response.ok) {
        alert("Subcategory updated successfully");
        actions.resetForm();
        setFormKey((prev) => prev + 1);
        closeEditSubcategoryModal();
        dispatch(fetchSubcategories());
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
      <button onClick={closeEditSubcategoryModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Edit Subcategory</h2>

      <Formik
        enableReinitialize
        key={formKey}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={subcategoryValidationSchema}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
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
                options={category.map((cat: any) => ({
                  label: cat.name,
                  value: cat._id,
                }))}
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
              placeholder="Enter subcategory description"
              rows="2"
            />

            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                {formik.isSubmitting ? "Updating..." : "Update Subcategory"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditSubcategory;
