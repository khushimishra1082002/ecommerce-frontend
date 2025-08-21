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

const AdminLogin = () => {
  const navigate = useNavigate();

  const initialValues: LoginDTO = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginDTO,
    onSubmitProps: FormikHelpers<LoginDTO>
  ) => {
    try {
      const response = await LoginUserData(values);
      console.log("Login Response:", response);

      if (response && response.message === "Login successfully") {
        if (response.token) {
          localStorage.setItem("token", response.token);
          console.log("Token saved:", response.token);
        }

        if (response.user?.role) {
          localStorage.setItem("role", response.user.role);
          console.log("Role saved:", response.user.role);
        }

        onSubmitProps.resetForm();
        

       
        if (response.user?.role?.toLowerCase() === "admin") {
          alert("Login Successful")
          navigate("/adminDashboard");
        } else {
          navigate("/"); 
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
          src="https://e0.pxfuel.com/wallpapers/754/1015/desktop-wallpaper-admin-login.jpg"
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
