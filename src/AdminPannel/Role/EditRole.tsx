// import React, { useEffect, useState } from "react";
// import { Formik, Form, FormikHelpers } from "formik";
// import { RxCross2 } from "react-icons/rx";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../ReduxToolkit/app/Store";
// import FormikControl from "../../components/ReusableFormField/FormikControl";
// import { RolesDTo } from "../../types/role";
// import { editRoleData } from "../../services/roleService";
// import { getPermissionData } from "../../services/permissionServices";

// interface EditRoleProps {
//   closeEditRoleModel: () => void;
//   editData: any;
//   fetchRoles: () => void;
// }

// const EditRole: React.FC<EditRoleProps> = ({
//   closeEditRoleModel,
//   editData,
//   fetchRoles,
// }) => {
//   console.log("editData", editData);

//   const [permissionsList, setPermissionsList] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const res = await getPermissionData();
//         if (Array.isArray(res)) {
//           setPermissionsList(res);
//         } else if (Array.isArray(res?.data)) {
//           setPermissionsList(res.data);
//         }
//       } catch (error) {
//         console.error("Error fetching permissions:", error);
//       }
//     };
//     fetchPermissions();
//   }, []);

//   const initialValues: RolesDTo = {
//     name: editData?.name || "",
//     permissions: (editData?.permissions || []).map((p: any) =>
//       typeof p === "string" ? p : p._id
//     ),
//     description: editData?.description || "",
//   };

//   const onSubmit = async (
//     values: RolesDTo,
//     actions: FormikHelpers<RolesDTo>
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("description", values.description ?? "");
//       formData.append("permissions", values.permissions);

//       const response = await editRoleData(editData._id, formData);

//       if (response.ok) {
//         alert("Role updated successfully");
//         actions.resetForm();
//         closeEditRoleModel();
//         fetchRoles();
//       } else {
//         alert(response.message || "Update failed");
//       }
//     } catch (error: any) {
//       console.error(error);
//       alert(error.message || "Error occurred");
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button onClick={closeEditRoleModel} className="absolute top-2 right-2">
//         <RxCross2 className="text-lg cursor-pointer" />
//       </button>

//       <h2 className="text-lg font-heading font-semibold mb-5">Edit Category</h2>

//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         // validationSchema={categoryValidationSchema}
//       >
//         {(formik) => (
//           <Form className="space-y-4">
//             <div className="grid grid-cols-1 gap-3">
//               <FormikControl
//                 control="input"
//                 type="text"
//                 label="Role Name"
//                 name="name"
//                 placeholder="Enter category name"
//               />

//               <FormikControl
//                 control="textarea"
//                 label="Description"
//                 name="description"
//                 valid={formik.errors.description && formik.touched.description}
//                 placeholder="Enter product description"
//                 rows="2"
//               />

//               <div>
//                  <h3 className="font-medium mb-2 font-heading text-sm">
//                   Assign Permissions
//                 </h3>

//                    <div className="space-y-4">
//  {permissionsList.map((perm) => (
//                 <div className="space-y-1">
//                   <h3 className="font-heading text-sm">{perm.module}</h3>
//                   <label
//                     key={perm._id}
//                     className="flex items-center gap-2 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       name="permissions"
//                       value={perm._id}
//                       checked={formik.values.permissions.includes(perm._id)} // ✅ prefill here
//                       onChange={() => {
//                         const current = formik.values.permissions;
//                         if (current.includes(perm._id)) {
//                           formik.setFieldValue(
//                             "permissions",
//                             current.filter((id) => id !== perm._id)
//                           );
//                         } else {
//                           formik.setFieldValue("permissions", [
//                             ...current,
//                             perm._id,
//                           ]);
//                         }
//                       }}
//                     />
//                     {perm.name}
//                   </label>
//                 </div>
//               ))}
//                    </div>
//               </div> 

          
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={!formik.isValid || formik.isSubmitting}
//                 className="w-full bg-black text-white p-2 rounded"
//               >
//                 {formik.isSubmitting ? "Submitting..." : "Edit Permission"}
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default EditRole;

import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { RolesDTo } from "../../types/role";
import { editRoleData } from "../../services/roleService";
import { getPermissionData } from "../../services/permissionServices";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  const [permissionsList, setPermissionsList] = useState<any[]>([]);
  const [openModule, setOpenModule] = useState<string>("");

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await getPermissionData();
        if (Array.isArray(res)) setPermissionsList(res);
        else if (Array.isArray(res?.data)) setPermissionsList(res.data);
        else setPermissionsList([]);
      } catch (err) {
        console.error("Error fetching permissions:", err);
        setPermissionsList([]);
      }
    };
    fetchPermissions();
  }, []);

  // Group permissions by module
  const groupedPermissions = permissionsList.reduce(
    (acc: Record<string, any[]>, perm) => {
      if (!acc[perm.module]) acc[perm.module] = [];
      acc[perm.module].push(perm);
      return acc;
    },
    {}
  );

  const initialValues: RolesDTo = {
    name: editData?.name || "",
    description: editData?.description || "",
    permissions: (editData?.permissions || []).map((p: any) =>
      typeof p === "string" ? p : p._id
    ),
  };

  const onSubmit = async (
    values: RolesDTo,
    actions: FormikHelpers<RolesDTo>
  ) => {
    try {
      const response = await editRoleData(editData._id, values);

      if (response.success || response.ok) {
        alert(response.message || "Role updated successfully");
        actions.resetForm();
        closeEditRoleModel();
        fetchRoles();
      } else {
        alert(response.message || "Update failed");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white p-5 rounded shadow">
      <button
        onClick={closeEditRoleModel}
        className="absolute top-2 right-2"
      >
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Edit Role</h2>

      <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          const togglePermission = (permId: string) => {
            const current = formik.values.permissions;
            if (current.includes(permId)) {
              formik.setFieldValue(
                "permissions",
                current.filter((id) => id !== permId)
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
              {Object.entries(groupedPermissions).map(([module, perms]) => (
                <div key={module} className="border rounded p-2 mb-2 font-body">
                  <h3
                    className="flex justify-between items-center cursor-pointer bg-gray-100 px-3 py-2 rounded text-sm"
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
                      {/* Select/Deselect All */}
                      <label className="flex items-center gap-2 text-sm font-medium mb-1">
                        <input
                          type="checkbox"
                          checked={perms.every((p) =>
                            formik.values.permissions.includes(p._id)
                          )}
                          onChange={() => {
                            const permIds = perms.map((p) => p._id);
                            const allSelected = permIds.every((id) =>
                              formik.values.permissions.includes(id)
                            );
                            if (allSelected) {
                              formik.setFieldValue(
                                "permissions",
                                formik.values.permissions.filter(
                                  (id) => !permIds.includes(id)
                                )
                              );
                            } else {
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
                            formik.values.permissions.includes(p._id)
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
                            checked={formik.values.permissions.includes(perm._id)}
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
                  {formik.isSubmitting ? "Submitting..." : "Update Role"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditRole;

