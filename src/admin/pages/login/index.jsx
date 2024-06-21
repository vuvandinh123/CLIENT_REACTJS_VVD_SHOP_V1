/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useChangeLang } from "../../../hooks";
import { LoginAdmin } from "../../service/Auth";
import { getCookieAuth, handlerError, setCookieAuth } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { checkRole } from "../../../helpers/utils";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (checkRole("SHOP")) {
      navigate("/admin");
    }
  }, []);
  // hook thay đổi ngôn ngữ
  const [lang, changeLang] = useChangeLang();
  // khởi tạo sử dụng i18n thay dđổi ngôn ngữ
  const { t } = useTranslation();
  // form submit login
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const fetchApi = async () => {
      try {
        const response = await LoginAdmin(data);
        const accessToken = response?.data?.token?.accessToken;
        const refreshToken = response?.data?.token?.refreshToken;
        if (response?.status === 200) {
          const decodedToken = jwtDecode(accessToken);
          if (decodedToken.role !== "SHOP") {
            toast.error("Bạn không có quyền đăng nhập");
            return;
          }
          setCookieAuth({
            userId: decodedToken.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            remember: true,
          });
          window.location.href = "/admin";
        }
      } catch (error) {
        toast.error("Tài khoản hoặc mật khẩu không đúng");
      }
    };
    handlerError(fetchApi);
  };

  // hàm sự kiện thay đổi
  const handleChangeUsername = (event) => {
    setData({
      ...data,
      email: event.target.value,
    });
  };
  const handleChangePassword = (event) => {
    setData({
      ...data,
      password: event.target.value,
    });
  };
  return (
    <>
      <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
          <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div className="font-medium text-center self-center text-xl sm:text-2xl uppercase text-gray-800">
              {t("admin.login.title")}
            </div>

            <div className="relative mt-10 h-px bg-gray-300">
              <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                  {t("admin.login.description")}
                </span>
              </div>
            </div>
            <div className="mt-10">
              <form action="" onSubmit={handleSubmitLogin}>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="email"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    {t("admin.login.username")}:
                  </label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="text"
                      name="email"
                      onChange={handleChangeUsername}
                      className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder={t("admin.login.placehoder")}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="password"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    {t("admin.login.password")}:
                  </label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      <span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                    </div>
                    <input
                      id="password"
                      type="password"
                      onChange={handleChangePassword}
                      name="password"
                      className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder={t("admin.login.placehoder2")}
                    />
                  </div>
                </div>
                <div className="flex items-center mb-6 -mt-4">
                  <div className="flex ml-auto">
                    <a
                      href="#"
                      className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                    >
                      {t("admin.login.forgot")}
                    </a>
                  </div>
                </div>
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                  >
                    <span className="mr-2 uppercase">
                      {t("admin.login.submit")}
                    </span>
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center mt-6">
              <Link
                to={"/admin/register-shop"}
                className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
              >
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
                <span className="ml-2">{t("admin.login.register")}</span>
              </Link>
            </div>
            <div className="flex justify-center gap-3 items-center mt-6">
              <span>{t("admin.login.lang")}:</span>
              <select
                name=""
                id=""
                className="px-3 outline-blue-200 bg-white border border-gray-200 rounded-lg py-1"
                onChange={changeLang}
              >
                <option selected={lang === "en"} value="en">
                  English
                </option>
                <option selected={lang === "vi"} value="vi">
                  Vietnames
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
