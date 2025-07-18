import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/ReusableFormField/FormikControl";
import { decodeToken } from "../../utils/decodeToken";
import { editUserData, getSingleUserData } from "../../services/UserServices";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const decoded = decodeToken();
  const userId = decoded?.id;
  const [formKey, setFormKey] = useState(0);
  const [data, setData] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const fetchSingleUser = async () => {
    try {
      const res = await getSingleUserData(userId);
      setData(res);
      setPreviewImage(res.image); // Set initial profile image
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSingleUser();
    }
  }, [userId]);

  const initialValues = {
    fullname: data?.fullname || "",
    email: data?.email || "",
    phoneNo: data?.phoneNo || "",
    image: null,
    address: {
      street: data?.address?.street || "",
      city: data?.address?.city || "",
      state: data?.address?.state || "",
      zipCode: data?.address?.zipCode || "",
      country: data?.address?.country || "",
    },
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNo: Yup.string().required("Phone number is required"),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("Zip Code is required"),
      country: Yup.string().required("Country is required"),
    }),
  });

  const onSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email ?? "");
      formData.append("phoneNo", values.phoneNo);
      formData.append("address", JSON.stringify(values.address));
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await editUserData(userId, formData);
      if (response.ok) {
        alert("Profile updated successfully");
        actions.resetForm();
        setFormKey((prev) => prev + 1);
        fetchSingleUser();
      } else {
        alert(response.message || "Update failed");
      }
      // navigate("/userProfile");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error occurred");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 px-12 py-6  gap-5 ">
      <div className=" p-8 bg-white shadow  ">
        <div className="w-full py-4">
          {data && (
            <Formik
              key={formKey}
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {(formik) => (
                <Form className="w-full space-y-6 ">
                <div className="grid grid-cols-3 gap-4 ">
                   <div className="bg-white shadow rounded-xl space-y-3 w-full
                 border border-black/10 p-5">
                   {/* Profile Image Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative w-36 h-36 rounded-full shadow group">
                      <label htmlFor="profileImageInput" className="cursor-pointer">
                        <img
                          className="w-full h-full rounded-full object-cover shadow"
                          src={
                            previewImage ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpWWQrAJpIR6Xy7FhzhCT00vzSmT7xw9S2Q&s"
                          }
                          alt="User"
                        />
                        <div className="absolute inset-0 bg-black
                         bg-opacity-40 rounded-full flex items-center justify-center
                          opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-semibold">Change</span>
                        </div>
                      </label>
                      <input
                        id="profileImageInput"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.currentTarget.files[0];
                          if (file) {
                            formik.setFieldValue("image", file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImage(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-xl font-medium font-heading">
                        {data?.fullname || "Loading..."}
                      </h4>
                      <span className="text-[13px] font-heading font-light">
                        {data?.email || ""}
                      </span>
                    </div>
                  </div>

                  <ProfileSidebar/>
                 </div>

                 <div className=" col-span-2 border border-black/10 p-6">
                   {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Fullname"
                      name="fullname"
                      placeholder="Enter fullname"
                    />
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="Enter email"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Phone Number"
                      name="phoneNo"
                      placeholder="Enter phone number"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Street"
                      name="address.street"
                      placeholder="Street address"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="City"
                      name="address.city"
                      placeholder="City"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="State"
                      name="address.state"
                      placeholder="State"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Zip Code"
                      name="address.zipCode"
                      placeholder="Zip Code"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Country"
                      name="address.country"
                      placeholder="Country"
                    />
                  </div>

                  <div className="py-4">
                    <button
                      className="px-6 py-2 rounded bg-black text-white font-medium"
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                 </div>
                </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default UserProfilePage;
