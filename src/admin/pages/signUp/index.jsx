import { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import { Form, Formik } from "formik";
import AddressForm from "./components/AddressForm";
import CreateShopForm from "./components/CreateShopForm";
import { createShop } from "../../service/Shop";
import toast from "react-hot-toast";
import VerifyEmail from "./components/VerifyEmail";

const SignUp = () => {
  const [tab, setTab] = useState("about");
  const [isSuccess, setIsSuccess] = useState(false);
  //   inint data
  const [about, setAbout] = useState({
    user_last_name: "",
    user_first_name: "",
    user_email: "",
    user_phone: "",
    shop_cccd: "",
    user_check: false,
  });
  const [address, setAddress] = useState({
    shop_address: "",
    shop_province_id: "",
    shop_nation_id: "1",
  });
  const [shop, setShop] = useState({
    shop_name: "",
    shop_phone: "",
    shop_description: "",
    shop_username: "",
    shop_website: "",
    shop_logo: "",
  });
  const handleSubmit = async () => {
    const newData = {
      ...about,
      ...address,
      ...shop,
    };
    const res = await createShop(newData);
    if (res.status === 201) {
      toast.success("Đăng ký thành công!");
      setIsSuccess(true);
    }
  };
  return (
    <div className="flex justify-center bg-gray-50 items-center">
      {/* modal */}
      {isSuccess && <VerifyEmail email={about.user_email} />}
      <div className="lg:w-[1200px] relative  rounded-lg w-full p-5 min-h-screen">
        <div className="fixed z-50 left-1/2 right-1/2 top-0 -translate-x-1/2 w-[1150px] bg-white">
          <ol className="grid grid-cols-1 divide-x shadow-md divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:grid-cols-3">
            <li
              className={`flex items-center ${
                tab === "about" ? "bg-gray-200" : ""
              } justify-center gap-2 p-4`}
            >
              <svg
                className="size-7 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>

              <p className="leading-none">
                <strong className="block font-medium">
                  {" "}
                  Thông tin cá nhân{" "}
                </strong>
                <small className="mt-1"> Một số thông tin về bạn. </small>
              </p>
            </li>
            <li
              className={`flex items-center ${
                tab === "address" ? "bg-gray-200" : ""
              } justify-center gap-2 p-4`}
            >
              <span className="absolute -left-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-100"></span>
              <span className="absolute -right-2 top-1/2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-100 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"></span>
              <svg
                className="size-7 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <p className="leading-none">
                <strong className="block font-medium"> Địa chỉ </strong>
                <small className="mt-1">Cửa hàng bạn ở đâu? </small>
              </p>
            </li>
            <li
              className={`flex items-center ${
                tab === "create" ? "bg-gray-200" : ""
              } justify-center gap-2 p-4`}
            >
              <svg
                className="size-7 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>

              <p className="leading-none">
                <strong className="block font-medium">Tạo cửa hàng</strong>
                <small className="mt-1">
                  {" "}
                  Các thông tin sẽ được hiển thị với khách hàng.{" "}
                </small>
              </p>
            </li>
          </ol>
        </div>
        <div className="mt-10">
          <Formik
            initialValues={{
              ...about,
              ...address,
              ...shop,
            }}
            onSubmit={()=>{}}
          >
            <Form>
              {tab === "about" && (
                <SignUpForm setTab={setTab} data={about} setData={setAbout} />
              )}
              {tab === "address" && (
                <AddressForm
                  setTab={setTab}
                  data={address}
                  setData={setAddress}
                />
              )}
              {tab === "create" && (
                <CreateShopForm
                  setTab={setTab}
                  data={shop}
                  setData={setShop}
                  handleSubmit={handleSubmit}
                />
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
