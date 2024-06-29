import { Link } from "react-router-dom";
import { useApiCall, useChangeLang } from "../../../hooks";
import UserHeader from "../user";
import { getShopId } from "../../service/Shop";
import { getCookieAuth } from "../../../utils";
import logo from "../../../../public/logo2.png";
const Header = () => {
  // hook thay đổi ngôn ngữ
  const { userId } = getCookieAuth();
  const [lang, changeLang] = useChangeLang();
  const { data: user } = useApiCall(async () => {
    const res = await getShopId(userId);
    return res.data;
  }, [userId]);
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link
              to={"/"}
              className="w-[150px] font-bold flex items-center lg:ml-2.5"
            >
              <img src={logo} className="w-full" alt="Windster Logo" />
              {/* <span className="self-center whitespace-nowrap">VVD SHOP</span> */}
            </Link>
            <form action="#" method="GET" className="hidden lg:block lg:pl-32">
              <label htmlFor="topbar-search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="mt-1 relative lg:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="topbar-search"
                  className="bg-gray-50 outline-blue-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex justify-center gap-3 items-center">
              <select
                name=""
                id=""
                className="px-3 outline-blue-200 bg-white border border-gray-200 rounded-lg py-1"
                onChange={changeLang}
                value={lang}
              >
                <option value="vi">Việt Nam</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              {/* user */}
              <UserHeader user={user}></UserHeader>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
