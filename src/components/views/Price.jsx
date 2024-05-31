import PropTypes from "prop-types";
import { useDropdown } from "../../hooks";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setPrice } from "../../redux/slice/priceSlice";
import { conversionPrice } from "../../api/data";

const Price = () => {
  
  const dispatch = useDispatch();
  const dropRef = useRef(null);
  const iconRef = useRef(null);
  const [data, setData] = useState(conversionPrice[0]);
  const { dropdow, setDropdow } = useDropdown(false, dropRef, iconRef);
  const handleChangePrice = (item) => {
    setData(item);
    setDropdow(false);
    dispatch(setPrice(item))
  }
  return (
    <div className="relative">
      <div>
        <h3
          ref={iconRef}
          className="cursor-pointer"
          onClick={() => setDropdow(!dropdow)}
        >
          {data.name}
          <i className="fa-solid fa-chevron-down ms-3 text-[9px] text-slate-500"></i>
        </h3>
        <div
          ref={dropRef}
          className={`absolute min-w-[200px] w-max rounded-md shadow-md top-0  z-50 right-0 bg-white opacity-0 invisible scale-y-50 transition-all duration-300 ${
            dropdow && "!scale-100 !top-full opacity-100 !visible"
          }`}
        >
          <ul className="leading-8 p-3">
            {conversionPrice.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={()=>handleChangePrice(item)}
                  className={`hover:text-[#2b38d1] cursor-pointer hover:pl-1 transition-all  ${
                    data.id == item.id && "!text-[#2b38d1]"
                  }`}
                >
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
Price.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Price;
