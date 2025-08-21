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
import { UserDTO } from "../../types/user";
import { CreateUserData } from "../../services/UserServices";

interface AddUserProps {
  closeAddUserModal: () => void;
  fetchUsers: () => void;
}

const initialValues: UserDTO = {
  fullname: "",
  email: "",
  phoneNo: "",
  password: "",
};

const AddUser: React.FC<AddUserProps> = ({ closeAddUserModal, fetchUsers }) => {
  const onSubmit = async (values: UserDTO, actions: FormikHelpers<UserDTO>) => {
    try {
      const response = await CreateUserData(values);

      if (response.success) {
        alert(response.message || "Permission added successfully ");
        await fetchUsers();
        actions.resetForm();
        closeAddUserModal();
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
      <button onClick={closeAddUserModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">Create User</h2>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form className="space-y-5">
              <div className="grid grid-cols-1 gap-4">
                {/* fullname */}
                <FormikControl
                  control="input"
                  type="text"
                  label="Fullname"
                  name="fullname"
                  placeholder="Enter fullname"
                  valid={formik.errors.fullname && formik.touched.fullname}
                />

                {/* Email */}
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  valid={formik.errors.email && formik.touched.email}
                />

                {/* Email */}
                <FormikControl
                  control="input"
                  type="number"
                  label="PhoneNo"
                  name="phoneNo"
                  placeholder="Enter phoneNo"
                  valid={formik.errors.phoneNo && formik.touched.phoneNo}
                />

                {/* Password */}
                <FormikControl
                  control="password"
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  valid={formik.errors.password && formik.touched.password}
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 rounded my-2"
                >
                  {formik.isSubmitting ? "Submitting..." : "Add User"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddUser;
