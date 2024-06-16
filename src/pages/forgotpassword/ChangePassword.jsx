/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Auth from "../../service/Auth";
import { getUrlSearchParam } from "../../utils";
import { useNavigate } from "react-router-dom";
import { route } from "../../constants";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const token = getUrlSearchParam("token");
  const email = getUrlSearchParam("email");
  useEffect(() => {
    if (!token || !email) {
      navigate(route.LOGIN);
    }
  }, [token, email]);
  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    if (data.newPassword === "" || data.confirmPassword === "") {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    const res = await Auth.VerifyForgetPassword({
      email,
      token,
      newPassword: data.newPassword,
    });
    if (res.data === true) {
      toast.success("Mật khẩu đã được cập nhật");
      setInterval(() => {
        window.location.href = route.LOGIN;
      }, 1000);
    }
  };
  const handleClickDiscard = () => {
    setInterval(() => {
      window.location.href = route.LOGIN;
    }, 1000);
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center">Quên mật khẩu</h1>
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Cập nhật mật khẩu để tăng cường bảo mật tài khoản.
        </p>
        <form
          onSubmit={handleSubmitChangePassword}
          id="changePasswordForm"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Mật khẩu mới *
            </label>
            <input
              type="password"
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
              value={data.newPassword}
              id="newPassword"
              className="px-3 py-2 focus:border-blue-500 outline-blue-500 form-input block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium   text-gray-700 block mb-2"
            >
              Xác nhận mật khẩu *
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              value={data.confirmPassword}
              className=" px-3 py-2 form-input  outline-blue-500 block border w-full border-gray-300 rounded-md shadow-sm"
              required
            />
            <button
              type="button"
              onClick={() =>
                setData({ ...data, newPassword: "", confirmPassword: "" })
              }
              className="text-xs  text-blue-600 hover:underline mt-2"
            >
              Xóa
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClickDiscard}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Thoát
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              ÁP DỤNG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
