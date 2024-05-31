import PropTypes from "prop-types";
import { AiOutlineSetting } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDropdown } from "../../../hooks";
import { useRef } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Auth from "../../../service/Auth";
import toast from "react-hot-toast";
import { removeCookieAuth } from "../../../utils";
const LoginUser = ({ user }) => {
  const dropRef = useRef(null);
  const iconRef = useRef(null);
  const { dropdow, setDropdow } = useDropdown(false, dropRef, iconRef);
  const handleClickLogout = async () => {
    const logout = await Auth.Logout();
    if (logout.data) {
      removeCookieAuth();
      window.location.reload();
      toast.success("Logout successfully");
    } else {
      toast.success("Logout failed");
    }
  };
  return (
    <div className="hidden lg:block mx-4 relative">
      <div
        ref={iconRef}
        onClick={() => setDropdow(!dropdow)}
        className="cursor-pointer flex items-center gap-2 mr-10"
      >
        {user?.image ? (
          <img className="w-10 h-10 rounded-full border" src={user?.image} alt="" />
        ) : (
          <img
            className="w-10 h-10"
            src="https://res06.bignox.com/noxinfluencer/youtube/studio/b043c298b52515b4864f2952fc9e6325/GDFBEJEGFxeKkti1635148464537.png"
            alt=""
          />
        )}

        <div>
          <p className="text-[#3c3d3e] tracking-widest text-[10px]">Hello</p>
          <p className="text-[#212529] font-bold text-[14px] capitalize">
            {user?.firstName}
          </p>
        </div>
      </div>
      <div
        ref={dropRef}
        className={`${
          dropdow ? "visible opacity-100 !scale-100" : "invisible opacity-0"
        } scale-y-50 transition-all duration-200  absolute z-50 -left-16 -right-16 `}
      >
        <div className="bg-white  shadow-lg p-5">
          <div className="flex justify-center relative">
            {user?.image ? (
              <img className="w-10 h-10 rounded-full border" src={user?.image} alt="" />
            ) : (
              <div className="relative">
                <img
                  className="w-10 h-10"
                  src="https://res06.bignox.com/noxinfluencer/youtube/studio/b043c298b52515b4864f2952fc9e6325/GDFBEJEGFxeKkti1635148464537.png"
                  alt=""
                />
              </div>
            )}
          </div>
          <Link to={""} className="text-center py-3 ">
            <p className="mt-2 font-semibold flex gap-1 justify-center items-center capitalize">
              <span>{user?.lastName + " " + user?.firstName}</span>
              {user.email_verified ? (
                <FaCircleCheck
                  className="text-[#00B9E8]"
                  size={12}
                ></FaCircleCheck>
              ) : (
                ""
              )}
            </p>
            {user.email_verified === 0 && (
              <p className="text-[10px] text-red-300">Not verified</p>
            )}
            <p className="pb-2 text-[12px] w-full overflow-hidden text-gray-400 mt-1">
              {user?.email}
            </p>
          </Link>
          <hr />
          <div className="mt-3">
            <Link
              to={"/cart"}
              className="flex hover:text-black text-gray-600  items-center gap-2 py-1 text-base"
            >
              <TfiShoppingCartFull />
              Cart
            </Link>
            <Link
              to={"/order-details"}
              className="flex hover:text-black text-gray-600  items-center gap-2 py-1 text-base"
            >
              <IoBagCheckOutline />
              Purchased Order
            </Link>
            <Link
              to={""}
              className="flex hover:text-black text-gray-600  items-center gap-2 py-1 text-base"
            >
              <AiOutlineSetting />
              Setting
            </Link>

            <button
              onClick={handleClickLogout}
              className="flex hover:text-red-700 text-red-500  items-center gap-2 py-1 text-base"
            >
              <CiLogout />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
LoginUser.propTypes = {
  user: PropTypes.object.isRequired,
};
export default LoginUser;
