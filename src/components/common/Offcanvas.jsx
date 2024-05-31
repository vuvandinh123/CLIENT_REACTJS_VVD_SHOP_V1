import PropTypes  from "prop-types";

import { useEffect } from "react";

const Offcanvas = ({label,children,isOpen,setIsOpen}) => {
  useEffect(() => {
      if(isOpen){
        document.body.style.overflow = "hidden";
      }else{
        document.body.style.overflow = "unset";
      }
  },[isOpen])
  return (
    <div>
      <div>
        <div className={`${isOpen ? "visible" : "invisible "}`}>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed cursor-crosshair inset-0 h-full z-50 bg-[#0000006d]"
          ></div>
          <div
            className={`bg-white overflow-hidden  max-w-full h-[100vh] fixed right-0 top-0 bottom-0 transition-all duration-300 z-50 ${
              isOpen ? "w-[450px] max-w-full visible opacity-100" : "translate-x-full w-0 invisible opacity-0"
            }`}
          >
            <div className="flex justify-between items-center p-1 pl-3 bg-[#f1f5f6]">
              <h2 className="text-base uppercase font-bold">{label}</h2>
              <i
                className="fa-solid hover:rotate-180 hover:text-red-500 text-gray-500 transition-all duration-300 p-3 fa-xmark cursor-pointer text-2xl"
                onClick={() => setIsOpen(false)}
              ></i>
            </div>

            <div className="relative h-[100vh] overflow-hidden">
                {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Offcanvas.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
}
export default Offcanvas;
