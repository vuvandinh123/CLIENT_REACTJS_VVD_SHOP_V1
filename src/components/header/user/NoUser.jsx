import { Link } from "react-router-dom";
import imageUser from "../../../../public/user.svg";

const NoUser = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Link to={"auth/login"} href="#" className="flex items-center gap-2 mr-10">
          <img src={imageUser} alt="" />
          <div>
            <p className="text-[#3c3d3e] tracking-widest font-medium text-[11px]">
              Login
            </p>
            <p className="text-[#212529] font-bold text-[14px]">Account</p>
          </div>
        </Link>
      </div>
    </>
  );
};
export default NoUser;
