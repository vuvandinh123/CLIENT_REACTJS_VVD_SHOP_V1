import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
const MenuItem = ({ item, handleClickHiddenMenu }) => {
  const [open,setOpen] = useState(false);
  return (
    <li className=" lg:py-0 group relative py-5  md:border-none w-full md:w-max lg:border-b-1">
      <div>
        <div className="flex justify-between items-center">
          <Link
            to={item.link}
            onClick={handleClickHiddenMenu}
            className="block w-full font-bold  text-[#26292c] hover:text-[#2b38d1]"
            href=""
          >
            {item.name}
          </Link>
          {item.children && item.children.length > 0 && (
            <i
              onClick={() => setOpen(!open)}
              className="fa-solid  fa-chevron-down text-end ml-2 mr-2 text-[12px]"
            ></i>
          )}
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className={`absolute  lg:group-hover:block hidden  top-full rounded-md -left-3 z-30  bg-white min-w-[150px] shadow-md p-3 ${open ? "!block !relative !top-0 shadow-none left-1" : "hidden"}`}>
          <ul className="leading-8">
            {item.children?.map((child) => (
              <MenuItem key={child.id} item={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  handleClickHiddenMenu: PropTypes.func
};
export default MenuItem;
