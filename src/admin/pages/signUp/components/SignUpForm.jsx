/* eslint-disable react/prop-types */
import { Form, Formik } from "formik";
import React from "react";
import TextFiled from "../../../components/fields/TextFiled";
import { Link } from "react-router-dom";
import NumberFiled from "../../../components/fields/NumberFiled";
import { isObjectEmptyOrNull } from "../../../../helpers/utils";
import toast from "react-hot-toast";
import { checkEmailExits } from "../../../service/Validate";

const SignUpForm = ({ setTab, data, setData }) => {
  const [message, setMessage] = React.useState("");
  const handleClickSubmit = () => {
    // validate
    if(message){
      toast.error(message);
      return;
    }
    if (isObjectEmptyOrNull(data)) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (data.shop_cccd.length != 12) {
      toast.error("Căn cước công dân không đúng!");
      return;
    }
    if (data.user_phone.length < 9 || data.user_phone.length > 10) {
      toast.error("Số điện thoại không đúng!");
      return;
    }
    if (!data.user_check) {
      toast.error("Vui lòng đồng ý với điều khoản của chúng tôi!");
      return;
    }
    setTab("address");
  };
  const checkEmail =async (value) => {
    console.log(value);
    try {
      await checkEmailExits(value);
      setMessage("")
    } catch (error) {
      if(error.response.status === 601){
        setMessage("Email đã được sử dụng");
      }
    }
  };
  return (
    <div>
      <section className="bg-white shadow-lg overflow-hidden mt-16 rounded-md">
        <div className="lg:grid lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Chào mừng bạn đến với VVD SHOP 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Hãy đăng ký bán hàng cùng chúng tôi với các ưu đãi và lãi xuất
                khủng cho các nhà bán hàng tại VVD SHOP.
              </p>
            </div>
          </section>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="#"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Squid 🦑
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>
              <div className="text-2xl font-bold text-center">VVD SHOP</div>
              <p className="text-gray-500 text-center font-light">
                Hãy cho chúng tôi biết thông tin về bạn !
              </p>
              {/* Form */}
              <div className="mt-8 grid grid-cols-12 gap-6">
                <div className="col-span-6 ">
                  <TextFiled
                    label="Họ đệm"
                    onChange={(e) => {
                      setData({ ...data, user_last_name: e.target.value });
                    }}
                    value={data.user_last_name}
                    name="lastName"
                    placeholder="Vũ Văn"
                  ></TextFiled>
                </div>

                <div className="col-span-6 ">
                  <TextFiled
                    label="Tên"
                    name="firstName"
                    value={data.user_first_name}
                    onChange={(e) => {
                      setData({ ...data, user_first_name: e.target.value });
                    }}
                    placeholder="Định"
                  ></TextFiled>
                </div>

                <div className="col-span-12">
                  <TextFiled
                    label="Email"
                    value={data.user_email}
                    onChange={(e) => {
                      setData({ ...data, user_email: e.target.value });
                    }}
                    onBlur={(e) => checkEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                  ></TextFiled>
                  <span className="text-sm font-thin text-gray-500 mt-2 block">
                    {
                      message ? <span className="text-red-500 font-normal">{message}</span> : " Email sẽ dùng để đăng nhập cho lần tiếp theo !"
                    }
                  </span>
                </div>
                <div className="col-span-12">
                  <NumberFiled
                    label="Số điện thoại"
                    location={"+84"}
                    value={data.user_phone}
                    onChange={(e) => {
                      setData({ ...data, user_phone: e.target.value });
                    }}
                    locaPosition="left"
                    name="user_phone"
                    placeholder="0123 456 789"
                  ></NumberFiled>
                </div>
                <div className="col-span-12">
                  <TextFiled
                    label="Căn cước công dân"
                    name="shop_cccd"
                    value={data.shop_cccd}
                    onChange={(e) => {
                      setData({ ...data, shop_cccd: e.target.value });
                    }}
                    type="number"
                    placeholder="068***"
                  ></TextFiled>
                </div>

                <div className="col-span-12">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      checked={data.user_check}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setData({ ...data, user_check: true });
                        } else {
                          setData({ ...data, user_check: false });
                        }
                      }}
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      Bạn đồng ý với các{" "}
                      <Link className="ms-1 underline text-blue-500">
                        điều khoản và điều kiện
                      </Link>{" "}
                      cũng như
                      <Link to={"#"} className=" underline ms-1 text-blue-500">
                        chính sách quyền riêng tư của chúng tôi
                      </Link>
                      .
                    </span>
                  </label>
                </div>
                <div className="col-span-12 sm:flex justify-between sm:items-center sm:gap-4">
                  <button
                    onClick={handleClickSubmit}
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Tiếp tục
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Bạn đã có tài khoản
                    <Link
                      to={"/admin/login"}
                      className="text-gray-700 ms-3 underline"
                    >
                      Đăng nhập
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default SignUpForm;
