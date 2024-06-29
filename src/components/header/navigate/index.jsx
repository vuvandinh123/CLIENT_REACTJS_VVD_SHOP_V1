import { useEffect, useState } from "react";
import imageSale from "../../../../public/sale.svg";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import Sidebar from "./Sidebar";
import { menus } from "../../../api/data";
import { useApiCall, useDropdown } from "../../../hooks";
import { Link } from "react-router-dom";
function buildMenuTree(menuItems, parent_id = 0) {
  let menuTree = [];
  menuItems.forEach((item) => {
    if (item.parent_id === parent_id) {
      const children = buildMenuTree(menuItems, item.id);
      if (children.length) {
        item.children = children;
      }
      menuTree.push(item);
    }
  });
  return menuTree;
}

const Navigate = ({ isOpenMenu, setIsOpenMenu, menuRef }) => {
  const [scroll, setScroll] = useState(false);
  const { dropdow, setDropdow, dropdowRef } = useDropdown(false);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const scroll = window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
        setDropdow(false);
      }
    });
    return () => {
      removeEventListener("scroll", scroll);
    };
  }, []);
  useApiCall(
    async () => {
      const menu = buildMenuTree(menus);
      setMenu(menu);
      return null;
    },
    [buildMenuTree],
    []
  );

  const handleClickDropdown = () => {
    if (window.scrollY > 200 || !(window.location.pathname === "/")) {
      setDropdow(!dropdow);
    }
  };
  const handleClickHiddenMenu = () => {
    setIsOpenMenu(false);
  };
  return (
    <>
      <div
        className={`border-b   max-w-[100%] m-auto px-4 hidden bg-[#fff] ${
          isOpenMenu && "!block"
        } lg:block ${
          scroll && "fixed !top-0 z-50 left-0"
        } z-50 transition-all duration-500 -top-20  shadow-yellow-500 right-0`}
      >
        <div className="fixed md:hidden top-0 left-0 right-0 bottom-0 z-30 bg-[#0000007a]"></div>
        <div
          className={`flex max-w-[1410px] z-50 ${
            isOpenMenu &&
            "fixed z-50 bg-[#505050cb] top-0 left-0  bottom-0 right-0"
          }  max-w-[100%] lg:px-5 mx-auto items-center`}
        >
          <Sidebar
            isOpenMenu={isOpenMenu}
            dropdowRef={dropdowRef}
            handleClickDropdown={handleClickDropdown}
            dropdow={dropdow}
          />
          <div
            ref={menuRef}
            className={`${
              isOpenMenu && "w-[70%] h-[100vh]"
            } lg:border-l lg:border-[#ccc]  transition-all pt-8 md:pt-0 duration-300  lg:w-auto lg:bg-transparent bg-white`}
          >
            <ul
              className={`flex items-center ${
                isOpenMenu &&
                "flex-col h-full overflow-y-auto w-full overflow-scroll "
              } relative gap-x-8 justify-start px-6`}
            >
              <button
                onClick={handleClickHiddenMenu}
                className="mt-5 lg:hidden items-center w-full text-center gap-2 text-[1.0rem] text-red-500 uppercase"
              >
                Close<i className="ml-2 fa-solid fa-xmark"></i>
              </button>
              <li className="lg:hidden">
                <h3 className="text-center my-5 font-semibold text-[11px]">
                  WHAT ARE YOU LOOKING FOR?
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={""}
                    className="rounded-full border-0 outline-none px-3 py-2 w-full shadow-md"
                    placeholder="Search"
                  />
                  <button className="absolute right-8 top-3">
                    {" "}
                    <i className="fa-solid fa-magnifying-glass absolute"></i>
                  </button>
                </div>
              </li>
              {menu.map((item, index) => {
                return (
                  <MenuItem
                    handleClickHiddenMenu={handleClickHiddenMenu}
                    key={index}
                    item={item}
                  />
                );
              })}

              <li className=" lg:py-0 py-5 border-b lg:border-b-0">
                <Link to={"/seller"} className=" hover:text-[#2b38d1] text-red-600" href="">
                  Đăng ký bán hàng
                </Link>
              </li>
            </ul>
          </div>
          <div className={`flex-auto ${isOpenMenu && "hidden"}`}>
            <a
              className=" flex gap-2 justify-end text-[#ffbd2e] font-bold text-base hover:text-[#2b38d1]"
              href=""
            >
              <img src={imageSale} alt="" />
              Khuyến mãi 20% cho đơn hàng đầu tiên
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
Navigate.propTypes = {
  isOpenMenu: PropTypes.bool,
  setIsOpenMenu: PropTypes.func,
  menuRef: PropTypes.object,
};
export default Navigate;
