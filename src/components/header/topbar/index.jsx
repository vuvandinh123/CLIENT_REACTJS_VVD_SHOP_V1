import { Link } from "react-router-dom";
import Nation from "../../views/Nation";
import Price from "../../views/Price";

const Topbar = () => {
  return (
    <>
      <div className="topbar hidden lg:block py-3 max-w-[1410px] px-5 mx-auto text-sm">
        <div className="flex justify-between items-center">
          <Link to={"/admin"} className="text-[#515d66] hover:text-blue-500 font-medium">
            Đăng ký bán hàng cũng VVDSHOP để có những ưu đãi hấp dẫn
          </Link>
          <ul className="flex gap-x-8 text-[#212529]">
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                Vị trí cửa hàng
              </a>
            </li>
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                Theo dõi đơn hàng
              </a>
            </li>
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                FAQs
              </a>
            </li>
           
            <Nation />
            <Price/>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Topbar;
