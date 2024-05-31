/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useDropdown } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import { setUrlSearchParam } from "../../utils";
const nation = [
  {
    id: 1,
    name: "English",
    code: "en",
    img: "https://demo-uminex.myshopify.com/cdn/shop/t/4/assets/flag_en.png?v=14076981825125011091681116945",
  },
  {
    id: 2,
    name: "Vietnamese",
    code: "vi",
    img: "https://product.hstatic.net/1000075554/product/c-e1-bb-9d-vi-e1-bb-87t-nam-qu9u-bt_c5f68d00deb342b6a14586945d4f02e4_4dcb5d32327543ed98cf16075d577b25_master.jpg",
  },
];
const Nation = () => {
  // Khai báo
  const dropRef = useRef(null);
  const iconRef = useRef(null);
  const [data, setData] = useState(nation[0]);
  // hook custom dropdown
  const { dropdow, setDropdow } = useDropdown(false, dropRef, iconRef);
  // kiểm tra và khởi tạo ngôn ngữ
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setData(
        nation.find((item) => item.code === localStorage.getItem("lang"))
      );
      setUrlSearchParam("lang", lang);
    }
  }, []);
  // thay đổi ngôn ngữ
  const handleChangeLang = (item) => {
    localStorage.setItem("lang", item.code);
    setData(item);
    setUrlSearchParam("lang", item.code);
    setDropdow(false);
  };
  return (
    <div className="relative">
      <div>
        <h3
          ref={iconRef}
          className="cursor-pointer"
          onClick={() => setDropdow(!dropdow)}
        >
          <img
            className="w-5 flex-shrink-0 inline me-1"
            src={data.img}
            alt=""
          />{" "}
          {data.name}
          <i className="fa-solid fa-chevron-down ms-3 text-[9px] text-slate-500"></i>
        </h3>
        <div
          ref={dropRef}
          className={`absolute min-w-[150px] rounded-md shadow-md top-0  z-50 right-0 bg-white opacity-0 invisible scale-y-50 transition-all duration-300 ${
            dropdow && "!scale-100 !top-full opacity-100 !visible"
          }`}
        >
          <ul className="leading-8 p-3">
            {nation.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    handleChangeLang(item);
                  }}
                  className={`hover:text-[#2b38d1] cursor-pointer hover:pl-1 transition-all  ${
                    data.id == item.id && "!text-[#2b38d1]"
                  }`}
                >
                  <img
                    className="w-5 flex-shrink-0 inline me-1"
                    src={item.img}
                    alt=""
                  />{" "}
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
Nation.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Nation;
