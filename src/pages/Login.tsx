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
import { useDispatch } from "react-redux";
import { fetchProfile } from "../ReduxToolkit/Slices/ProfileSlice";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { fetchWishlistProduct } from "../ReduxToolkit/Slices/WishlistSlice";
import { AppDispatch } from "../ReduxToolkit/app/Store";

type LoginProps = {
  setShowSignUp: (value: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setShowSignUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: LoginDTO = {
    email: "",
    password: "",
  };

  const handleGoToSignup = () => {
    setShowSignUp(true);
  };

  const onSubmit = async (
    values: LoginDTO,
    onSubmitProps: FormikHelpers<LoginDTO>,
  ) => {
    try {
      const response = await LoginUserData(values);

      if (response && response.message) {
        alert(response.message);

        if (response.message === "Login successfully") {
          if (response.token) {
            localStorage.setItem("token", response.token);
            console.log("Token saved:", response.token);
             localStorage.setItem("role", response.user.role);
              console.log("role", response.user.role);
          } else {
            console.warn("No token found in response");
          }
          onSubmitProps.resetForm();
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
      <div
        className=" flex flex-col  gap-4 w-11/12 md:w-8/12 m-auto
       border border-black/10 p-8 rounded-md "
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold font-heading">Login now</h1>
          <span className="text-gray-500 font-heading text-[13px]">
            Login your account
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
                  className=" w-full  space-y-2
                 
                     "
                >
                  <div className="grid grid-cols-1 gap-4">
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
              You have no account?{" "}
            </span>
            <span
              onClick={handleGoToSignup}
              className="text-skin-primary text-sm  font-body font-semibold hover:underline
                 hover:scale-105 duration-500 hover:text-orange-600 cursor-pointer"
            >
              SignUp{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
