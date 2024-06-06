import { useNavigate } from "react-router-dom";
import "./style.css";
import { useToken } from "../../hooks";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import Auth from "../../service/Auth";
import { useState } from "react";
import FormLogin from "./components/FormLogin";
import { setLocalStorage } from "../../helpers/utils";
import LoginSocial from "./components/LoginSocial";
const Login = () => {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const { setToken } = useToken();
  const handleSubmitLogin = async (values) => {
    const data = await Auth.Login(values);
    if (data.status === 200) {
      setLocalStorage("remember_me", remember);
      setToken({ data: data.data, remember: remember });
      if (data.data.user.email_verified === 0) {
        navigate("/auth/verify-email");
        return;
      }
      const url = sessionStorage.getItem("url");
      toast.success("Đăng nhập thành công");
      if (url) {
        navigate(url);
      } else {
        navigate("/");
      }
    } else {
      toast.error("Login failed ! Wrong email or password");
    }
  };

  const handleRememberme = (e) => {
    if (e.target.checked) {
      setRemember(true);
    } else {
      setRemember(false);
    }
  };
  return (
    <>
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div
            className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
            }}
          >
            <div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0" />
            <div
              className="absolute triangle  min-h-screen right-0 w-16"
              style={{}}
            />
            <a
              href="https://codepen.io/uidesignhub"
              title="codepen aji"
              className="flex absolute top-5 text-center text-gray-100 focus:outline-none"
            >
              <p className="text-xl ml-3">
                VU DINH<strong> STORE</strong>
              </p>{" "}
            </a>
            <img
              src="https://jasper-pimstorage-skullcandy.s3.us-west-1.amazonaws.com/bd2253a9671dac36a95faf821b52e78935050140be1718ce001f6aace45cf25c.png"
              className="h-96 absolute right-5 mr-5"
            />
            <div className="w-full  max-w-md z-10">
              <div className="sm:text-4xl xl:text-5xl font-bold  leading-tight mb-6">
                VVD SHOP
              </div>
              <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                <p>
                  {" "}
                  VVD SHOP là một website mua sắm trực tuyến với nhiều ưu đãi và
                  khuyễn mại hot hãy đăng nhập để có trải nhiệm tốt nhất và đồng
                  hành cùng chúng tôi.{" "}
                  <p className="mt-3">Chúc các bạn có một ngày mua sắm vui vẻ !!!</p>
                </p>
              </div>
            </div>
            {/*-remove custom style*/}
            <ul className="circles">
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
          <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  VVD SHOP Xin Chào
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Vui lòng đăng nhập 
                </p>
              </div>
              <LoginSocial />
              <div className="flex items-center justify-center space-x-2">
                <span className="h-px w-16 bg-gray-200" />
                <span className="text-gray-300 font-normal">
                  Hoặc đăng nhập với
                </span>
                <span className="h-px w-16 bg-gray-200" />
              </div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object({
                  email: Yup.string().email().required("Email is required"),
                  password: Yup.string().required("Password is required"),
                })}
                onSubmit={(values) => handleSubmitLogin(values)}
              >
                <FormLogin handleRememberme={handleRememberme} />
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
