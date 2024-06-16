/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Auth from "../../service/Auth";
import toast from "react-hot-toast";
import { useToken } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../helpers/utils";
const LoginWithGooglePage = () => {
  const getToken = async () => {
    const url = new URLSearchParams(window.location.hash.substring(1));
    const token = url.get("access_token");
    return token;
  };
  const { setToken } = useToken();
  const navigate = useNavigate();
  const getUserInfo = async () => {
    getToken().then(async (token) => {
      if (!token) {
        window.location.href = "/auth/login";
        toast.error("Đăng nhập google thất bại!");
      }
      const response = await Auth.getUserInfoGoogle(token);
      const newData = {
        firstName: response.given_name,
        lastName: response.family_name,
        image: response.picture,
        email: response.email,
        email_verified: response.email_verified,
        type_login: "google",
      };
      const fetchLoginWithGoogle = await Auth.LoginSocial(newData);
      setLocalStorage("remember_me", true);
      setToken({ data: fetchLoginWithGoogle.data, remember: true });
      toast.success("Đăng nhập thành công");
      navigate("/");
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return <div>Loading...</div>;
};

export default LoginWithGooglePage;
