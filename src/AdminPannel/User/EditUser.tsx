import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { RxCross2 } from "react-icons/rx";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { editUserData } from "../../services/UserServices";
import { UserDTO } from "../../types/user";

interface EditUserProps {
  closeEditUserModal: () => void;
  fetchUsers: () => void;
  editData: any;
}

const EditUser: React.FC<EditUserProps> = ({
  closeEditUserModal,
  fetchUsers,
  editData,
}) => {

  const initialValues: UserDTO = {
    fullname: editData?.fullname || "",
    email: editData?.email || "",
    phoneNo: editData?.phoneNo || "",
    password: "", // optional
  };

  const onSubmit = async (
    values: UserDTO,
    actions: FormikHelpers<UserDTO>
  ) => {
    try {
      const response = await editUserData(editData._id, values);

      if (response) {
        alert("User Updated Successfully");
        await fetchUsers();
        closeEditUserModal();
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white p-5 rounded shadow">
      <button onClick={closeEditUserModal} className="absolute top-2 right-2">
        <RxCross2 className="text-lg cursor-pointer" />
      </button>

      <h2 className="text-lg font-heading font-semibold mb-5">
        Edit User
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="space-y-5">
              <div className="grid grid-cols-1 gap-4">

                <FormikControl
                  control="input"
                  type="text"
                  label="Fullname"
                  name="fullname"
                  placeholder="Enter fullname"
                  valid={formik.errors.fullname && formik.touched.fullname}
                />

                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  valid={formik.errors.email && formik.touched.email}
                />

                <FormikControl
                  control="input"
                  type="number"
                  label="PhoneNo"
                  name="phoneNo"
                  placeholder="Enter phoneNo"
                  valid={formik.errors.phoneNo && formik.touched.phoneNo}
                />

                {/* Optional password change */}
                <FormikControl
                  control="password"
                  type="password"
                  label="Password (Optional)"
                  name="password"
                  placeholder="Enter new password"
                  valid={formik.errors.password && formik.touched.password}
                />

              </div>

              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="w-full bg-black text-white p-2 rounded my-2"
                >
                  {formik.isSubmitting ? "Updating..." : "Update User"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditUser;
