import bagSvg from "../../../public/svg/bag.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const NavBottom = () => {
  const { cartAr } = useSelector((state) => state.cart);
  let qtyCart = 0;
  cartAr.forEach((item) => {
    qtyCart += item.qty;
  });
  return (
    <div className="fixed lg:hidden bottom-0 shadow-nav left-0 right-0 h-20 bg-white z-40 px-7">
      <ul className="flex justify-between items-center">
        <li className="">
          <NavLink
            to={"/"}
            className={({ isActive }) => {
              return isActive ? "stroke-[#2B38D1] mb-1 after:content-[''] after:block after:h-2  after:bg-[#2B38D1] after:rounded-full after:shadow-2xl after:blur-[6px]  after:transition-all" : "stroke-[#212529]";
            }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18V15"
                stroke="inherit"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.0698 2.82L3.13978 8.37C2.35978 8.99 1.85978 10.3 2.02978 11.28L3.35978 19.24C3.59978 20.66 4.95978 21.81 6.39978 21.81H17.5998C19.0298 21.81 20.3998 20.65 20.6398 19.24L21.9698 11.28C22.1298 10.3 21.6298 8.99 20.8598 8.37L13.9298 2.83C12.8598 1.97 11.1298 1.97 10.0698 2.82Z"
                stroke="inherit"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/categories/all"}
            className={({ isActive }) => {
              return isActive ? "stroke-[#2B38D1] mb-1 after:content-[''] after:block after:h-2  after:bg-[#2b86d1c3] after:rounded-full after:shadow-2xl after:blur-[5px]  after:transition-all" : "stroke-[#212529]";
            }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-inherit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.00977 11.22V15.71C3.00977 20.2 4.80977 22 9.29977 22H14.6898C19.1798 22 20.9798 20.2 20.9798 15.71V11.22"
                stroke="inherit"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12C13.83 12 15.18 10.51 15 8.68L14.34 2H9.66999L8.99999 8.68C8.81999 10.51 10.17 12 12 12Z"
                stroke="inherit"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3098 12C20.3298 12 21.8098 10.36 21.6098 8.35L21.3298 5.6C20.9698 3 19.9698 2 17.3498 2H14.2998L14.9998 9.01C15.1698 10.66 16.6598 12 18.3098 12Z"
                stroke="inherit"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.63988 12C7.28988 12 8.77988 10.66 8.93988 9.01L9.15988 6.8L9.63988 2H6.58988C3.96988 2 2.96988 3 2.60988 5.6L2.33988 8.35C2.13988 10.36 3.61988 12 5.63988 12Z"
                stroke="inherit"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17C10.33 17 9.5 17.83 9.5 19.5V22H14.5V19.5C14.5 17.83 13.67 17 12 17Z"
                stroke="inherit"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </li>
        <li className="rounded-full shadow-cart border-[5px] border-white flex justify-center items-center text-white -translate-y-10 bg-[#2b38d1] w-20 h-20">
          <NavLink to={"/cart"}>
            <img src={bagSvg} alt="" />
            {qtyCart > 0 && (
              <span className="absolute top-3 left-10 bg-red-500 rounded-full text-[13px] w-5 h-5 text-center">
                {qtyCart}
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <a href="">
            <i className="fa-solid text-[1.3rem] fa-magnifying-glass"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa-regular text-[1.3rem] fa-heart"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBottom;
