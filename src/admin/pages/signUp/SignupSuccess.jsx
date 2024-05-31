/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUrlSearchParam } from "../../../utils";
import { verifyEmailRegisterShop } from "../../service/Shop";
import toast from "react-hot-toast";

const SignupSuccess = () => {
  const navigate = useNavigate();
  const fnPostVerifyToken = async () => {
    const token = getUrlSearchParam("token");
    const email = getUrlSearchParam("email");
    if (!token || !email) {
      navigate("/admin/login");
    } else {
      //
      const res = await verifyEmailRegisterShop({ token, email });
      if (res.data === true) {
        toast.success("Xác nhận email thành công");
      }
    }
  };
  useEffect(() => {
    fnPostVerifyToken();
  }, []);
  return (
    <div>
      <div className="relative flex justify-center">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl sm:my-8 sm:w-full sm:p-6">
              <div className="flex items-center justify-center mx-auto">
                <img
                  className="h-full rounded-lg"
                  src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt
                />
              </div>
              <div className="mt-5 text-center">
                <h3
                  className="text-lg  text-green-600 font-bold uppercase  "
                  id="modal-title"
                >
                  Xác nhận email thành công
                </h3>
                <p className="mt-2 text-gray-500  ">
                  Cảm ơn bạn đã đăng ký bán hàng cùng{" "}
                  <span className="font-bold text-blue-500">VVD SHOP</span> yêu
                  cầu của bạn đã được gửi đến chúng tôi chúng tôi sẽ xác nhận và
                  gửi tài khoản mật khẩu vô email của bạn trong vòng 1 đến 2 giờ
                  làm việc.
                </p>
              </div>

              <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                <Link
                  to={"/"}
                  className="px-4 block text-center uppercase sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white  transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                >
                  Quay lại trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
