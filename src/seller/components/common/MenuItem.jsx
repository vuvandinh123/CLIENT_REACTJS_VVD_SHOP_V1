/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { CiPaperplane } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";

const MenuItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      {item.children ? (
        <span
          to={item.link}
          onClick={handleToggle}
          className="text-base text-gray-900 transition-all cursor-pointer font-normal rounded-lg flex items-center justify-between p-2 hover:bg-gray-100 group"
        >
          <span className="flex items-center">
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </span>
          {item.children && (
            <span>
              <MdKeyboardArrowDown></MdKeyboardArrowDown>
            </span>
          )}
        </span>
      ) : (
        <NavLink
          to={item.link}
          onClick={handleToggle}
          end
          className={({ isActive }) =>
            "text-base text-gray-900 transition-all cursor-pointer font-normal rounded-lg flex items-center justify-between p-2 hover:bg-gray-100 group" +
            (isActive ? " !font-bold bg-gray-100" : "")
          }
        >
          <span className="flex items-center">
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </span>
          {item.children && (
            <span>
              <MdKeyboardArrowDown></MdKeyboardArrowDown>
            </span>
          )}
        </NavLink>
      )}

      {item.children && isOpen && (
        <div className="ms-6 relative before:content-[''] before:block before:w-[2px] before:absolute before:top-0 before:bottom-0 before:-left-2 before:bg-gray-100 rounded-none">
          <ul className="flex flex-col gap-2">
            {item.children.map((item2, index) => (
              <li key={index}>
                <NavLink
                  to={item2.link}
                  end
                  className={({ isActive }) =>
                    "py-2 flex group text-gray-900 font-normal items-center transition-all gap-2 hover:bg-gray-100 rounded-md ps-2" +
                    (isActive ? " !font-bold  bg-gray-100" : "")
                  }
                >
                  <CiPaperplane className="" size={15}></CiPaperplane>{" "}
                  {item2.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default MenuItem;
