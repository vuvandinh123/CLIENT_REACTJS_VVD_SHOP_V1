import PropTypes  from "prop-types";

import { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const FilterMb = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="p-3">
        <div
          onClick={handleClickOpen}
          className="flex justify-between items-center"
        >
          <span className="uppercase">{label}</span>
          <FaLongArrowAltRight className="text-xl" />
        </div>
        <div
          className={`absolute w-0 h-[100vh] overflow-auto -right-full top-0 bottom-0 duration-200 transition-all bg-white ${
            isOpen ? " !w-full !right-0" : "invisible"
          }`}
        >
          <div
            onClick={handleClickOpen}
            className="flex sticky top-0  border-b gap-2 items-center p-3"
          >
            <FaLongArrowAltLeft className="text-xl" />
            <span className="uppercase">{label}</span>
          </div>
          <div className="max-h-[55vh] overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
FilterMb.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};
export default FilterMb;
