/* eslint-disable react/prop-types */
import { Avatar, Divider, Sidebar, toast } from "keep-react";
import { Chat, Gear, ShoppingCart, SignIn, Users } from "phosphor-react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { useAuth } from "../../../hooks";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookieAuth, removeCookieAuth } from "../../../utils";
import Auth from "../../../service/Auth";
import Swal from "sweetalert2";
import { TbAddressBook } from "react-icons/tb";
const LayoutUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const { userId, accessToken } = getCookieAuth();
    if (!userId || !accessToken) {
      navigate("/auth/login");
    }
  }, []);
  const handleClickLogout = async () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuat?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const logout = await Auth.Logout();
        if (logout.data) {
          removeCookieAuth();
          navigate("/auth/login");
          toast.success("Đăng xuất thành công");
        } else {
          toast.success("Đăng xuất thất bải");
        }
      }
    });
  };
  return (
    <div className="bg-[#F1F5F6]">
      <div className="max-w-[1410px] relative px-5 py-5 mx-auto">
        <div className="grid grid-cols-12">
          <Sidebar className="col-span-12  lg:col-span-3">
            <Sidebar.Body className="sticky top-16 h-max">
              <div className="flex gap-3 items-center">
                <Avatar shape="circle" img={user?.image} />
                <div>
                  <p className="mb-0 text-body-3 font-medium uppercase  text-metal-600">
                    {user?.lastName + " " + user?.firstName}
                  </p>
                  <NavLink
                    to={"/user?edit=true"}
                    className={({ isActive }) =>
                      "text-body-4 flex gap-2 cursor-pointer hover:text-blue-500 items-center font-normal text-metal-400" +
                      (isActive ? " !font-bold" : "")
                    }
                  >
                    <FaEdit></FaEdit> Chỉnh sửa
                  </NavLink>
                </div>
              </div>
              <Sidebar.Item className="mt-5">
                <NavLink
                  to={"/user"}
                  end
                  className={({ isActive }) =>
                    "flex gap-2 items-center transition-all cursor-pointer hover:text-blue-500" +
                    (isActive
                      ? " !font-bold text-blue-500 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] ps-2 before:rounded-full before:h-full before:bg-blue-500"
                      : "")
                  }
                >
                  <RiAccountCircleLine size={25}></RiAccountCircleLine>
                  Tài khoản của tôi
                </NavLink>
              </Sidebar.Item>

              <Sidebar.Item>
                <NavLink
                  end
                  className={({ isActive }) =>
                    "flex gap-2 items-center transition-all cursor-pointer hover:text-blue-500" +
                    (isActive
                      ? " !font-bold text-blue-500 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] ps-2 before:rounded-full before:h-full before:bg-blue-500"
                      : "")
                  }
                  to={"/user/purchase"}
                >
                  <MdOutlineEventNote size={24} />
                  Đơn mua
                </NavLink>
              </Sidebar.Item>
              <Sidebar.Item>
                <NavLink
                  end
                  className={({ isActive }) =>
                    "flex gap-2 items-center transition-all cursor-pointer hover:text-blue-500" +
                    (isActive
                      ? " !font-bold text-blue-500 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] ps-2 before:rounded-full before:h-full before:bg-blue-500"
                      : "")
                  }
                  to={"/user/chats"}
                >
                  <Chat size={24} />
                  Tin nhắn
                </NavLink>
              </Sidebar.Item>
              <Sidebar.Item>
                <NavLink
                  end
                  className={({ isActive }) =>
                    "flex gap-2 items-center transition-all cursor-pointer hover:text-blue-500" +
                    (isActive
                      ? " !font-bold text-blue-500 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] ps-2 before:rounded-full before:h-full before:bg-blue-500"
                      : "")
                  }
                  to={"/user/order-address"}
                >
                  <TbAddressBook size={24} />
                  Địa chỉ nhận hàng
                </NavLink>
              </Sidebar.Item>
              <Sidebar.Item>
                <NavLink
                  end
                  className={({ isActive }) =>
                    "flex gap-2 items-center transition-all cursor-pointer hover:text-blue-500" +
                    (isActive
                      ? " !font-bold text-blue-500 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] ps-2 before:rounded-full before:h-full before:bg-blue-500"
                      : "")
                  }
                  to={"/user/change-password"}
                >
                  <RiLockPasswordLine size={24} />
                  Đổi mật khẩu
                </NavLink>
              </Sidebar.Item>
              <Sidebar.Item
                onClick={handleClickLogout}
                className="cursor-pointer text-red-500"
              >
                <SignIn size={24} />
                Thoát
              </Sidebar.Item>
            </Sidebar.Body>
          </Sidebar>
          <div className="col-span-12  lg:col-span-9">
            {/* Content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutUser;
