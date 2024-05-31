import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { LoginSocialFacebook } from "reactjs-social-login";
import toast from "react-hot-toast";
import Auth from "../../../service/Auth";
import { setLocalStorage } from "../../../helpers/utils";
import { useToken } from "../../../hooks";
import { useNavigate } from "react-router-dom";
const LoginSocial = () => {
  const { setToken } = useToken();
  const handleClickLoginGoogle = async () => {
    window.location.href = import.meta.env.VITE_REACT_APP_URL_LOGIN_GOOGLE;
  };
  const navigate = useNavigate();
  const handleClickLoginFacebook = async (response) => {
    const { data, provider } = response;
    const newData = {
      firstName: data.first_name,
      lastName: data.last_name,
      image: data.picture.data.url,
      email: data.email || null,
      email_verified: 1,
      type_login: provider,
    };
    console.log(newData, "newData");
    const fetchLoginWithFacebook = await Auth.LoginSocial(newData);
    console.log(fetchLoginWithFacebook, "fetchLoginWithFacebook");
    if(fetchLoginWithFacebook && fetchLoginWithFacebook.status === 200){ 
      setLocalStorage("remember_me", true);
      setToken({ data: fetchLoginWithFacebook.data, remember: true });
      toast.success("Login successfully");
      navigate("/");
    } else {
      toast.error("Login facebook failed !");
    }
    
  };
  return (
    <div className="flex flex-row justify-center items-center space-x-3">
      <LoginSocialFacebook
        appId={import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID}
        onResolve={handleClickLoginFacebook}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <butoon className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg   bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300">
          <FaFacebookF color="white"></FaFacebookF>
        </butoon>
      </LoginSocialFacebook>
      <butoon
        onClick={handleClickLoginGoogle}
        className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg  text-white bg-red-500 hover:shadow-lg cursor-pointer transition ease-in duration-300"
      >
        <FaGoogle color="white"></FaGoogle>
      </butoon>
    </div>
  );
};

export default LoginSocial;
