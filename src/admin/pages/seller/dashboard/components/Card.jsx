/* eslint-disable react/prop-types */
import { MdOutlineContactSupport } from "react-icons/md";

const Card = ({ label, value, description }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {value}
          </span>
          <h3 className="text-base font-semibold text-gray-500">{label}</h3>
          <p className="text-gray-400 text-[12px] flex items-center gap-2">
            <MdOutlineContactSupport size={14}></MdOutlineContactSupport>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
