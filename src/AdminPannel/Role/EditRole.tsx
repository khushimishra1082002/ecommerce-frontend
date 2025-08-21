import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../ReduxToolkit/app/Store";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { RolesDTo } from "../../types/role";
import { editRoleData } from "../../services/roleService";
import { getPermissionData } from "../../services/permissionServices";

interface EditRoleProps {
  closeEditRoleModel: () => void;
  editData: any;
  fetchRoles: () => void;
}

const EditRole: React.FC<EditRoleProps> = ({
  closeEditRoleModel,
  editData,
  fetchRoles,
}) => {
  console.log("editData", editData);

  const [permissionsList, setPermissionsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await getPermissionData();
        if (Array.isArray(res)) {
          setPermissionsList(res);
        } else if (Array.isArray(res?.data)) {
          setPermissionsList(res.data);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
  }, []);

  const initialValues: RolesDTo = {
    name: editData?.name || "",
    permissions: (editData?.permissions || []).map((p: any) =>
      typeof p === "string" ? p : p._id
    ),
    description: editData?.description || "",
  };

  const onSubmit = async (
    values: RolesDTo,
    actions: FormikHelpers<RolesDTo>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description ?? "");
      formData.append("permissions", values.permissions);

      const response = await editRoleData(editData._id, formData);

      if (response.ok) {
        alert("Role updated successfully");
        actions.resetForm();
        closeEditRoleModel();
        fetchRoles();
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
      <button onClick={closeEditRoleModel} className="absolute top-2 right-2">
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
                control="textarea"
                label="Description"
                name="description"
                valid={formik.errors.description && formik.touched.description}
                placeholder="Enter product description"
                rows="2"
              />

              <div>
                 <h3 className="font-medium mb-2 font-heading text-sm">
                  Assign Permissions
                </h3>

                   <div className="space-y-4">
 {permissionsList.map((perm) => (
                <div className="space-y-1">
                  <h3 className="font-heading text-sm">{perm.module}</h3>
                  <label
                    key={perm._id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      name="permissions"
                      value={perm._id}
                      checked={formik.values.permissions.includes(perm._id)} // ✅ prefill here
                      onChange={() => {
                        const current = formik.values.permissions;
                        if (current.includes(perm._id)) {
                          formik.setFieldValue(
                            "permissions",
                            current.filter((id) => id !== perm._id)
                          );
                        } else {
                          formik.setFieldValue("permissions", [
                            ...current,
                            perm._id,
                          ]);
                        }
                      }}
                    />
                    {perm.name}
                  </label>
                </div>
              ))}
                   </div>
              </div> 

          
            </div>

            <div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
              >
                {formik.isSubmitting ? "Submitting..." : "Edit Permission"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditRole;
