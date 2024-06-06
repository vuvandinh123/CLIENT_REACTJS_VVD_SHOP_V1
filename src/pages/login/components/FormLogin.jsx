import { ErrorMessage, Field, Form } from "formik";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FORGOT_PASSWORD } from "../../../constants/routes";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
const FormLogin = ({ handleRememberme }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="relative">
        <div className="absolute right-3 top-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <label className="ml-1 text-sm block mb-2 font-bold text-gray-700 tracking-wide">
          Email
        </label>
        <Field
          className=" w-full mb-2 text-base px-4 py-2 border border-gray-300 focus:outline-none rounded-md focus:border-indigo-500"
          type="email"
          name="email"
          placeholder="mail@gmail.com"
        ></Field>
        <p className="text-[12px] ml-1 h-1 text-red-600">
          <ErrorMessage name="email" />
        </p>
      </div>
      <div className="mt-5 content-center">
        <label className="ml-1 mb-2 block text-sm font-bold text-gray-700 tracking-wide">
          Mật khẩu
        </label>
        <div className="relative">
          <Field
            className="w-full mb-2 border content-center text-base px-4 py-2  rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
          ></Field>
          <span
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute block top-[10px] text-gray-500 cursor-pointer right-3"
          >
            {!showPassword ? (
              <FaRegEyeSlash size={23}></FaRegEyeSlash>
            ) : (
              <FaRegEye size={23} />
            )}
            {/* <FaEyeSlash size={23}></FaEyeSlash> */}
          </span>
        </div>

        <p className="text-[12px] h-5 text-red-600">
          <ErrorMessage name="password" />
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            onChange={handleRememberme}
            type="checkbox"
            className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm text-gray-900"
          >
            Lưu thông tin đăng nhập
          </label>
        </div>
        <div className="text-sm">
          <Link
            to={FORGOT_PASSWORD}
            className="text-indigo-400 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
        >
          Sign in
        </button>
      </div>
      <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
        <span>{`Don't have an account?`}</span>
        <Link
          to="/auth/singup"
          href="#"
          className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
        >
          Sign up
        </Link>
      </p>
    </Form>
  );
};
FormLogin.propTypes = {
  handleRememberme: PropTypes.func,
};
export default FormLogin;
