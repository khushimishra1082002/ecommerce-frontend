import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LoginDTO, SignupDTO } from "../types/auth";
import { loginValidationSchema } from "../Validations/authValidations";
import FormikControl from "../components/ReusableFormField/Input";
import conf from "../config/Conf";
import axios from "axios";
import { LoginUserData, SignUpUserData } from "../services/authService";
import { LoginAdminData } from "../services/adminService";

const AdminLogin = () => {
  const navigate = useNavigate();

  const initialValues: LoginDTO = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginDTO,
    onSubmitProps: FormikHelpers<LoginDTO>,
  ) => {
    try {
      const response = await LoginAdminData(values);

      if (response && response.message) {
        alert(response.message);

        if (response.message === "Admin login successfully") {
          if (response.token) {
            localStorage.setItem("token", response.token);
            console.log("Token saved:", response.token);
             localStorage.setItem("role", response.user.role);
              console.log("role", response.user.role);
          } else {
            console.warn("No token found in response");
          }
          onSubmitProps.resetForm();
          navigate("/adminDashboard");
        }
      } else {
        alert("Unexpected response format.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error?.message || "An unexpected error occurred.");
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };
  return (
    <>
      <div className="relative h-[100vh] w-full">
        {/* Background image */}
        <img
          className="w-full h-full object-cover"
          src="https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Admin Login Background"
        />

        {/* Overlay (optional, for contrast) */}
        <div className="absolute inset-0 "></div>

        {/* Form container */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               flex flex-col gap-4 w-11/12 md:w-8/12
                backdrop-blur-md p-8 z-10"
        >
          <div
            className=" flex flex-col  gap-4 w-11/12 md:w-8/12 m-auto
       border border-white/20 p-8 rounded-md shadow-2xl"
          >
            <div className="flex flex-col text-white">
              <h1 className="text-2xl font-semibold font-heading">
                Admin Login
              </h1>
              <span className="text-gray-300 font-heading text-[13px]">
                Enter your credentials to access the admin dashboard
              </span>
            </div>

            <div className="w-full ">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={loginValidationSchema}
              >
                {(formik) => {
                  console.log("Formik", formik);
                  return (
                    <Form
                      className=" w-full  space-y-2 text-white
                 
                     "
                    >
                      <div className="grid grid-cols-1 gap-4">
                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="text-white text-sm font-heading mb-1"
                          >
                            Email
                          </label>
                          <FormikControl
                            control="input"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            labelClassName="text-white"
                            className="bg-transparent border border-white/20
                       text-white placeholder-white/70 px-3 py-2 rounded
                        focus:outline-none focus:ring-2 focus:ring-white focus:border-white
                        font-heading text-sm"
                            valid={formik.errors.email && formik.touched.email}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="text-white text-sm font-heading mb-1"
                          >
                            Password
                          </label>
                          {/* Password */}
                          <FormikControl
                            control="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            valid={
                              formik.errors.password && formik.touched.password
                            }
                            className="bg-transparent border border-white/20 text-white placeholder-white/70 px-3 py-2 rounded focus:outline-none
                       focus:ring-2 focus:ring-white focus:border-white"
                          />
                        </div>
                      </div>
                      <div className="py-2 flex justify-center items-center">
                        <button
                          className="px-4 py-2 rounded bg-black text-white w-full font-body
                              active:text-white disabled:bg-red-500 disabled:cursor-not-allowed"
                          disabled={!formik.isValid || formik.isSubmitting}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default AdminLogin;
