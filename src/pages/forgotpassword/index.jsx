import { Link } from "react-router-dom";
import { HOME, LOGIN } from "../../constants/routes";
import { useState } from "react";
import Auth from "../../service/Auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { route } from "../../constants";
const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleChangeEmail = (event) => {
    setData({ ...data, email: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "") {
      toast.error("Please enter email");
      return;
    }
    const res = await Auth.SendEmailForgetPassword(data);
    if (res.data === true) {
      toast.success("Check your email to reset password");
      navigate(LOGIN);
      return;
    }
    toast.error("Email does not exist");
  };
  return (
    <div>
      <div className="antialiased h-screen flex px-3 justify-center items-center bg-white lg:bg-slate-200">
        <div className="max-w-lg mx-auto lg:w-[500px] w-full  bg-white p-8 rounded-xl lg:shadow lg:shadow-slate-300">
          <p className="text-center font-bold text-3xl mb-10">
            VVD <span className="text-red-500 mb-4">Shop</span>
          </p>
          <h1 className="text-xl font-medium text-center uppercase">
            Forget password
          </h1>
          <p className="text-slate-500 text-center text-sm">
            Fill up the form to reset the password
          </p>
          <form onSubmit={handleSubmit} action className="my-5">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Email address</p>
                <input
                  id="email"
                  onChange={handleChangeEmail}
                  value={data.email}
                  name="email"
                  type="email"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
                <span>Send email</span>
              </button>
              <p className="text-center">
                Not registered yet?{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <Link to={route.SIGN_UP}>Register now </Link>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
