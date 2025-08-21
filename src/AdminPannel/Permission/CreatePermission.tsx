import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { RolesDTo } from "../../types/role";
import { createRoleData } from "../../services/roleService";
import {
  createPermissionData,
  getPermissionData,
} from "../../services/permissionServices";
import { PermissionDTO } from "../../types/permission";
interface CreateRoleProps {
  closeCreatePermissionModal: () => void;
  fetchPermission: () => void;
}

const initialValues: PermissionDTO = {
  name: "",
  description: "",
  module: "",
};

const CreatePermission: React.FC<CreateRoleProps> = ({
  closeCreatePermissionModal,
  fetchPermission,
}) => {
  const onSubmit = async (
    values: PermissionDTO,
    actions: FormikHelpers<PermissionDTO>
  ) => {
    try {
      const payload = {
        ...values,
      };

      const response = await createPermissionData(payload);

      if (response.success) {
        alert(response.message || "Permission added successfully ");
        await fetchPermission();
        actions.resetForm();
        closeCreatePermissionModal();
      } else {
        alert(response.message || "Something went wrong ");
      }
    } catch (error: any) {
      console.error("Error submitting role:", error);
      alert(error.response?.data?.message || "Submission failed ");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white p-5 rounded shadow">
      <button
        onClick={closeCreatePermissionModal}
        className="absolute top-2 right-2"
      >
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">
        Create Permission
      </h2>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form className="space-y-5">
              <FormikControl
                control="input"
                type="text"
                label=" Name"
                name="name"
                placeholder="Enter permission name"
              />

              <FormikControl
                control="input"
                type="text"
                label="Module"
                name="module"
                placeholder="Enter module name"
              />

              {/* Description */}
              <FormikControl
                control="textarea"
                label="Description"
                name="description"
                placeholder="Enter description"
              />

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 rounded my-2"
                >
                  {formik.isSubmitting ? "Submitting..." : "Add Permission"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreatePermission;
