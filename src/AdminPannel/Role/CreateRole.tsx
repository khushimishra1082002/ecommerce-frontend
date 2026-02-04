import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { RolesDTo } from "../../types/role";
import { createRoleData } from "../../services/roleService";
import { getPermissionData } from "../../services/permissionServices";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface CreateRoleProps {
  closeCreateRoleModel: () => void;
  fetchRoles: () => void;
}

const initialValues: RolesDTo = {
  name: "",
  description: "",
  permissions: [],
};

const CreateRole: React.FC<CreateRoleProps> = ({
  closeCreateRoleModel,
  fetchRoles,
}) => {
  const [permissionsList, setPermissionsList] = useState<any[]>([]);
  const [openModule, setOpenModule] = useState<string>("");
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await getPermissionData();

        if (Array.isArray(res)) {
          setPermissionsList(res);
        } else if (Array.isArray(res?.data)) {
          setPermissionsList(res.data);
        } else {
          setPermissionsList([]);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setPermissionsList([]);
      }
    };
    fetchPermissions();
  }, []);

  // Step 1: create a grouped object
  const groupedPermissions = permissionsList.reduce(
    (acc: Record<string, any[]>, perm) => {
      if (!acc[perm.module]) acc[perm.module] = [];
      acc[perm.module].push(perm);
      return acc;
    },
    {},
  );

  const onSubmit = async (
    values: RolesDTo,
    actions: FormikHelpers<RolesDTo>,
  ) => {
    try {
      const payload = {
        ...values,
        permissions: values.permissions,
      };

      const response = await createRoleData(payload);

      if (response.success) {
        alert(response.message || "Role added successfully ");
        await fetchRoles();
        actions.resetForm();
        closeCreateRoleModel();
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
      <button onClick={closeCreateRoleModel} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Create Role</h2>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          const togglePermission = (permId: string) => {
            const current = formik.values.permissions;
            if (current.includes(permId)) {
              formik.setFieldValue(
                "permissions",
                current.filter((p) => p !== permId),
              );
            } else {
              formik.setFieldValue("permissions", [...current, permId]);
            }
          };

          return (
            <Form className="space-y-5">
              {/* Role Name */}
              <FormikControl
                control="input"
                type="text"
                label="Role Name"
                name="name"
                placeholder="Enter role name"
              />

              {/* Description */}
              <FormikControl
                control="textarea"
                label="Description"
                name="description"
                placeholder="Enter role description"
              />

              {/* Permissions */}
              {/* <div className="space-y-3">
                <h3 className="font-medium mb-2 font-heading text-sm">
                  Assign Permissions
                </h3>

                {permissionsList.length > 0 ? (
                  permissionsList.map((perm) => (
                   <div key={perm._id}>
                     <h3 className="font-heading text-sm">{perm.module}</h3>
                    <label
                      key={perm._id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={formik.values.permissions.includes(perm._id)}
                        onChange={() => togglePermission(perm._id)}
                      />
                      <span className="text-[13px]  font-heading py-1">
                        {perm.name} 
                
                      </span>
                    </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    No permissions found
                  </p>
                )}
              </div> */}

              {Object.entries(groupedPermissions).map(([module, perms]) => (
                <div key={module} className="border rounded p-2 mb-2 font-body">
                  <h3
                    className="flex justify-between items-center cursor-pointer 
                     bg-gray-100 px-3 py-2 rounded text-sm"
                    onClick={() =>
                      setOpenModule((prev) => (prev === module ? "" : module))
                    }
                  >
                    <span>{module}</span>
                    {openModule === module ? (
                      <FiChevronUp className="text-gray-600" />
                    ) : (
                      <FiChevronDown className="text-gray-600" />
                    )}
                  </h3>

                  {openModule === module && (
                    <div className="pl-6 mt-2 space-y-1">
                      {/* Select/Deselect All with checkbox */}
                      <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <input
                          type="checkbox"
                          checked={perms.every((p) =>
                            formik.values.permissions.includes(p._id),
                          )}
                          onChange={() => {
                            const permIds = perms.map((p) => p._id);
                            const allSelected = permIds.every((id) =>
                              formik.values.permissions.includes(id),
                            );

                            if (allSelected) {
                              // Deselect all in this module
                              formik.setFieldValue(
                                "permissions",
                                formik.values.permissions.filter(
                                  (id) => !permIds.includes(id),
                                ),
                              );
                            } else {
                              // Select all in this module
                              formik.setFieldValue("permissions", [
                                ...new Set([
                                  ...formik.values.permissions,
                                  ...permIds,
                                ]),
                              ]);
                            }
                          }}
                        />
                        <span>
                          {perms.every((p) =>
                            formik.values.permissions.includes(p._id),
                          )
                            ? "Deselect All"
                            : "Select All"}
                        </span>
                      </label>

                      {/* Individual permissions */}
                      {perms.map((perm) => (
                        <label
                          key={perm._id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={formik.values.permissions.includes(
                              perm._id,
                            )}
                            onChange={() => togglePermission(perm._id)}
                          />
                          {perm.name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 rounded my-2"
                >
                  {formik.isSubmitting ? "Submitting..." : "Add Role"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateRole;
