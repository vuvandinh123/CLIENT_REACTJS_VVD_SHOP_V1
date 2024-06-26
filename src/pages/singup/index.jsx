import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Auth from "../../service/Auth";
import { setCookieAuth } from "../../utils";
import toast from "react-hot-toast";
const Singup = () => {
  const handleSubmitSingup = async (values) => {
    if (values.password !== values.passwordConfirm) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    const res = await Auth.SingUp(values);

    if (res.status === 200) {
      setCookieAuth({
        userId: res.data.user.id,
        accessToken: res.data.token.accessToken,
        refreshToken: res.data.token.refreshToken,
        remember: false,
      });
      window.location.href = "/auth/verify-email";
    } else if (res.status === 400) {
      toast.error(res.message);
    }
  };
  return (
    <div>
      <div className="bg-white relative h-screen ">
        <div className="mx-10 my-5 absolute">
          <Link
            to="/auth/login"
            className=" py-3 px-5 hover:text-red-600 rounded-lg text-black"
          >
            <span className="">{"<<<"}</span> Quay lại
          </Link>
        </div>
        <div
          className="flex flex-col items-center justify-between pt-0  mr-auto mb-0 ml-auto max-w-7xl
 lg:flex-row"
        >
          <div className="flex flex-col items-center w-full pt-5 pr-3 pb-20 pl-3 lg:pl-10 lg:pr-10 lg:pt-20 lg:flex-row">
            <div className="w-full hidden lg:block bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img
                  src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                  className="btn-"
                />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div
                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
      relative z-10"
              >
                <p className="w-full uppercase text-3xl font-medium text-center leading-snug font-serif">
                  Đăng ký tài khoản
                </p>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    passwordConfirm: "",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string().email().required("Email bắt buộc nhập"),
                    password: Yup.string().required("Mật khẩu bắt buộc nhập"),
                    passwordConfirm: Yup.string().required(
                      "Xác nhận mật khẩu bắt buộc nhập"
                    ),
                    firstName: Yup.string().required("Họ đệm bắt buộc nhập"),
                    lastName: Yup.string().required("Tên bắt buộc nhập"),
                  })}
                  onSubmit={(values) => handleSubmitSingup(values)}
                >
                  {({ errors, touched }) => (
                    <Form className="w-full">
                      <div className="w-full mt-6 relative space-y-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                          <div className="relative">
                            <p
                              className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                            >
                              Họ đệm
                            </p>
                            <Field
                              placeholder="Vũ Văn"
                              type="text"
                              name="firstName"
                              className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-3 pr-4 pb-3 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                            />
                            <p className="text-[12px] h-5 mt-1 ms-2 text-red-600">
                              <ErrorMessage name="firstName" />
                            </p>
                          </div>
                          <div className="relative">
                            <p
                              className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                            >
                              Tên
                            </p>
                            <Field
                              name="lastName"
                              placeholder="Định"
                              type="text"
                              className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full py-3 pr-4  pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                            />
                            <p className="text-[12px] h-5 mt-1 ms-2 text-red-600">
                              <ErrorMessage name="lastName" />
                            </p>
                          </div>
                        </div>
                        <div className="relative mt-0">
                          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                            Email
                          </p>
                          <Field
                            name="email"
                            placeholder="123@ex.com"
                            type="text"
                            className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                          />
                          <p className="text-[12px] h-5 mt-2 ms-2 text-red-600">
                            <ErrorMessage name="email" />
                          </p>
                        </div>
                        <div className="relative mb-2">
                          <p
                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                          >
                            Mật khẩu
                          </p>
                          <Field
                            name="password"
                            placeholder="Password"
                            type="password"
                            className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                          />
                          <p className="text-[12px] h-5 mt-2 ms-2 text-red-600">
                            <ErrorMessage name="password" />
                          </p>
                        </div>
                        <div className="relative mb-2">
                          <p
                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                          >
                            Xác nhận mật khẩu
                          </p>
                          <Field
                            name="passwordConfirm"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                          />
                          <p className="text-[12px] h-5 mt-2 ms-2 text-red-600">
                            <ErrorMessage name="passwordConfirm" />
                          </p>
                        </div>
                        <div>
                          <hr />
                          <p className="my-3 mt-5">
                            {" "}
                            Bạn đã có tài khoản{" "}
                            <Link
                              className="text-indigo-500 underline"
                              to={"/auth/login"}
                            >
                              Đăng nhập
                            </Link>
                          </p>
                        </div>
                        <div className="relative">
                          <button
                            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
            rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                          >
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <svg
                viewBox="0 0 91 91"
                className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
      fill-current"
              >
                <g stroke="none" strokeWidth={1} fillRule="evenodd">
                  <g fillRule="nonzero">
                    <g>
                      <g>
                        <circle cx="3.261" cy="3.445" r="2.72" />
                        <circle cx="15.296" cy="3.445" r="2.719" />
                        <circle cx="27.333" cy="3.445" r="2.72" />
                        <circle cx="39.369" cy="3.445" r="2.72" />
                        <circle cx="51.405" cy="3.445" r="2.72" />
                        <circle cx="63.441" cy="3.445" r="2.72" />
                        <circle cx="75.479" cy="3.445" r="2.72" />
                        <circle cx="87.514" cy="3.445" r="2.719" />
                      </g>
                      <g transform="translate(0 12)">
                        <circle cx="3.261" cy="3.525" r="2.72" />
                        <circle cx="15.296" cy="3.525" r="2.719" />
                        <circle cx="27.333" cy="3.525" r="2.72" />
                        <circle cx="39.369" cy="3.525" r="2.72" />
                        <circle cx="51.405" cy="3.525" r="2.72" />
                        <circle cx="63.441" cy="3.525" r="2.72" />
                        <circle cx="75.479" cy="3.525" r="2.72" />
                        <circle cx="87.514" cy="3.525" r="2.719" />
                      </g>
                      <g transform="translate(0 24)">
                        <circle cx="3.261" cy="3.605" r="2.72" />
                        <circle cx="15.296" cy="3.605" r="2.719" />
                        <circle cx="27.333" cy="3.605" r="2.72" />
                        <circle cx="39.369" cy="3.605" r="2.72" />
                        <circle cx="51.405" cy="3.605" r="2.72" />
                        <circle cx="63.441" cy="3.605" r="2.72" />
                        <circle cx="75.479" cy="3.605" r="2.72" />
                        <circle cx="87.514" cy="3.605" r="2.719" />
                      </g>
                      <g transform="translate(0 36)">
                        <circle cx="3.261" cy="3.686" r="2.72" />
                        <circle cx="15.296" cy="3.686" r="2.719" />
                        <circle cx="27.333" cy="3.686" r="2.72" />
                        <circle cx="39.369" cy="3.686" r="2.72" />
                        <circle cx="51.405" cy="3.686" r="2.72" />
                        <circle cx="63.441" cy="3.686" r="2.72" />
                        <circle cx="75.479" cy="3.686" r="2.72" />
                        <circle cx="87.514" cy="3.686" r="2.719" />
                      </g>
                      <g transform="translate(0 49)">
                        <circle cx="3.261" cy="2.767" r="2.72" />
                        <circle cx="15.296" cy="2.767" r="2.719" />
                        <circle cx="27.333" cy="2.767" r="2.72" />
                        <circle cx="39.369" cy="2.767" r="2.72" />
                        <circle cx="51.405" cy="2.767" r="2.72" />
                        <circle cx="63.441" cy="2.767" r="2.72" />
                        <circle cx="75.479" cy="2.767" r="2.72" />
                        <circle cx="87.514" cy="2.767" r="2.719" />
                      </g>
                      <g transform="translate(0 61)">
                        <circle cx="3.261" cy="2.846" r="2.72" />
                        <circle cx="15.296" cy="2.846" r="2.719" />
                        <circle cx="27.333" cy="2.846" r="2.72" />
                        <circle cx="39.369" cy="2.846" r="2.72" />
                        <circle cx="51.405" cy="2.846" r="2.72" />
                        <circle cx="63.441" cy="2.846" r="2.72" />
                        <circle cx="75.479" cy="2.846" r="2.72" />
                        <circle cx="87.514" cy="2.846" r="2.719" />
                      </g>
                      <g transform="translate(0 73)">
                        <circle cx="3.261" cy="2.926" r="2.72" />
                        <circle cx="15.296" cy="2.926" r="2.719" />
                        <circle cx="27.333" cy="2.926" r="2.72" />
                        <circle cx="39.369" cy="2.926" r="2.72" />
                        <circle cx="51.405" cy="2.926" r="2.72" />
                        <circle cx="63.441" cy="2.926" r="2.72" />
                        <circle cx="75.479" cy="2.926" r="2.72" />
                        <circle cx="87.514" cy="2.926" r="2.719" />
                      </g>
                      <g transform="translate(0 85)">
                        <circle cx="3.261" cy="3.006" r="2.72" />
                        <circle cx="15.296" cy="3.006" r="2.719" />
                        <circle cx="27.333" cy="3.006" r="2.72" />
                        <circle cx="39.369" cy="3.006" r="2.72" />
                        <circle cx="51.405" cy="3.006" r="2.72" />
                        <circle cx="63.441" cy="3.006" r="2.72" />
                        <circle cx="75.479" cy="3.006" r="2.72" />
                        <circle cx="87.514" cy="3.006" r="2.719" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg
                viewBox="0 0 91 91"
                className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
      fill-current"
              >
                <g stroke="none" strokeWidth={1} fillRule="evenodd">
                  <g fillRule="nonzero">
                    <g>
                      <g>
                        <circle cx="3.261" cy="3.445" r="2.72" />
                        <circle cx="15.296" cy="3.445" r="2.719" />
                        <circle cx="27.333" cy="3.445" r="2.72" />
                        <circle cx="39.369" cy="3.445" r="2.72" />
                        <circle cx="51.405" cy="3.445" r="2.72" />
                        <circle cx="63.441" cy="3.445" r="2.72" />
                        <circle cx="75.479" cy="3.445" r="2.72" />
                        <circle cx="87.514" cy="3.445" r="2.719" />
                      </g>
                      <g transform="translate(0 12)">
                        <circle cx="3.261" cy="3.525" r="2.72" />
                        <circle cx="15.296" cy="3.525" r="2.719" />
                        <circle cx="27.333" cy="3.525" r="2.72" />
                        <circle cx="39.369" cy="3.525" r="2.72" />
                        <circle cx="51.405" cy="3.525" r="2.72" />
                        <circle cx="63.441" cy="3.525" r="2.72" />
                        <circle cx="75.479" cy="3.525" r="2.72" />
                        <circle cx="87.514" cy="3.525" r="2.719" />
                      </g>
                      <g transform="translate(0 24)">
                        <circle cx="3.261" cy="3.605" r="2.72" />
                        <circle cx="15.296" cy="3.605" r="2.719" />
                        <circle cx="27.333" cy="3.605" r="2.72" />
                        <circle cx="39.369" cy="3.605" r="2.72" />
                        <circle cx="51.405" cy="3.605" r="2.72" />
                        <circle cx="63.441" cy="3.605" r="2.72" />
                        <circle cx="75.479" cy="3.605" r="2.72" />
                        <circle cx="87.514" cy="3.605" r="2.719" />
                      </g>
                      <g transform="translate(0 36)">
                        <circle cx="3.261" cy="3.686" r="2.72" />
                        <circle cx="15.296" cy="3.686" r="2.719" />
                        <circle cx="27.333" cy="3.686" r="2.72" />
                        <circle cx="39.369" cy="3.686" r="2.72" />
                        <circle cx="51.405" cy="3.686" r="2.72" />
                        <circle cx="63.441" cy="3.686" r="2.72" />
                        <circle cx="75.479" cy="3.686" r="2.72" />
                        <circle cx="87.514" cy="3.686" r="2.719" />
                      </g>
                      <g transform="translate(0 49)">
                        <circle cx="3.261" cy="2.767" r="2.72" />
                        <circle cx="15.296" cy="2.767" r="2.719" />
                        <circle cx="27.333" cy="2.767" r="2.72" />
                        <circle cx="39.369" cy="2.767" r="2.72" />
                        <circle cx="51.405" cy="2.767" r="2.72" />
                        <circle cx="63.441" cy="2.767" r="2.72" />
                        <circle cx="75.479" cy="2.767" r="2.72" />
                        <circle cx="87.514" cy="2.767" r="2.719" />
                      </g>
                      <g transform="translate(0 61)">
                        <circle cx="3.261" cy="2.846" r="2.72" />
                        <circle cx="15.296" cy="2.846" r="2.719" />
                        <circle cx="27.333" cy="2.846" r="2.72" />
                        <circle cx="39.369" cy="2.846" r="2.72" />
                        <circle cx="51.405" cy="2.846" r="2.72" />
                        <circle cx="63.441" cy="2.846" r="2.72" />
                        <circle cx="75.479" cy="2.846" r="2.72" />
                        <circle cx="87.514" cy="2.846" r="2.719" />
                      </g>
                      <g transform="translate(0 73)">
                        <circle cx="3.261" cy="2.926" r="2.72" />
                        <circle cx="15.296" cy="2.926" r="2.719" />
                        <circle cx="27.333" cy="2.926" r="2.72" />
                        <circle cx="39.369" cy="2.926" r="2.72" />
                        <circle cx="51.405" cy="2.926" r="2.72" />
                        <circle cx="63.441" cy="2.926" r="2.72" />
                        <circle cx="75.479" cy="2.926" r="2.72" />
                        <circle cx="87.514" cy="2.926" r="2.719" />
                      </g>
                      <g transform="translate(0 85)">
                        <circle cx="3.261" cy="3.006" r="2.72" />
                        <circle cx="15.296" cy="3.006" r="2.719" />
                        <circle cx="27.333" cy="3.006" r="2.72" />
                        <circle cx="39.369" cy="3.006" r="2.72" />
                        <circle cx="51.405" cy="3.006" r="2.72" />
                        <circle cx="63.441" cy="3.006" r="2.72" />
                        <circle cx="75.479" cy="3.006" r="2.72" />
                        <circle cx="87.514" cy="3.006" r="2.719" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
