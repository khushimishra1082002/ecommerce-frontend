import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { SignupDTO } from "../types/auth";
import { signupValidationSchema } from "../Validations/authValidations";
import FormikControl from "../components/ReusableFormField/Input";
import conf from "../config/Conf";
import axios from "axios";
import { SignUpUserData } from "../services/authService";

console.log("Register URL:", conf.SignupUrl);

type SignUpProps = {
  setLoggedIn: (value: boolean) => void;
};

interface SignupResponse {
  success: boolean;
  message: string;
}

const SignUp: React.FC<SignUpProps> = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const initialValues: SignupDTO = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSignUp = () => {
    setLoggedIn(false);
  };

  const onSubmit = async (
    values: SignupDTO,
    onSubmitProps: FormikHelpers<SignupDTO>
  ) => {
    try {
      const response = await SignUpUserData(values);

      if (response && response.message) {
        alert(response.message);

        if (response.message === "Sign up successful") {
          onSubmitProps.resetForm();
          // setLoggedIn(true);
        }
      } else {
        alert("Unexpected response format.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error?.message || "An unexpected error occurred.");
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  return (
    <>
      <div className=" flex flex-col gap-4 w-11/12 md:w-8/12 m-auto
      border border-black/10 p-8 rounded-md ">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold font-heading">Sign up now</h1>
          <span className="text-gray-500 font-heading text-[13px]">
            Create a account
          </span>
        </div>
       
        <div className="w-full ">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signupValidationSchema}
          >
            {(formik) => {
              console.log("Formik", formik);
              return (
                <Form
                  className=" w-full  space-y-2
            
                "
                >
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

                    {/* Password */}
                    <FormikControl
                      control="password"
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="Enter password"
                      valid={formik.errors.password && formik.touched.password}
                    />

                    {/* Password */}
                    <FormikControl
                      control="password"
                      type="password"
                      label="ConfirmPassword"
                      name="confirmPassword"
                      placeholder="Enter confirmPassword"
                      valid={
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                      }
                    />
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
          <div className="flex justify-center items-center py-3 gap-2">
            <span className="text-gray-900 text-sm font-body">
              Already have an account?{" "}
            </span>
            <span
              onClick={handleSignUp}
              className="text-skin-primary text-sm  font-body font-semibold hover:underline
            hover:scale-105 duration-500 hover:text-orange-600 cursor-pointer"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
