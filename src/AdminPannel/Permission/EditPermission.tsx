import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../ReduxToolkit/app/Store";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { RolesDTo } from "../../types/role";
import { editRoleData } from "../../services/roleService";
import { editPermissionData, getPermissionData } from "../../services/permissionServices";
import { PermissionDTO } from "../../types/permission";

interface EditRoleProps {
  closeEditPermissionModal: () => void;
  editData: any;
  fetchPermission: () => void;
}

const EditPermission: React.FC<EditRoleProps> = ({
  closeEditPermissionModal,
  editData,
  fetchPermission,
}) => {
  console.log("editData", editData);

  const initialValues: PermissionDTO = {
    name: editData?.name || "",
    module: editData?.module || "",   
    description: editData?.description || "",
  };

  const onSubmit = async (
    values: PermissionDTO,
    actions: FormikHelpers<PermissionDTO>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description ?? "");
      formData.append("module", values.module);

      const response = await editPermissionData(editData._id, formData);

      if (response.ok) {
        alert("Permission updated successfully");
        actions.resetForm();
        closeEditPermissionModal();
        fetchPermission();
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
      <button onClick={closeEditPermissionModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Edit Category</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={categoryValidationSchema}
      >
        {(formik) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <FormikControl
                control="input"
                type="text"
                label="Role Name"
                name="name"
                placeholder="Enter category name"
              />

              <FormikControl
                control="input"
                type="text"
                label="Module Name"
                name="module"
                placeholder="Enter module name"
              />

              <FormikControl
                control="textarea"
                label="Description"
                name="description"
                valid={formik.errors.description && formik.touched.description}
                placeholder="Enter product description"
                rows="2"
              />

             

          
            </div>

            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                {formik.isSubmitting ? "Submitting..." : "Edit permission"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPermission;

