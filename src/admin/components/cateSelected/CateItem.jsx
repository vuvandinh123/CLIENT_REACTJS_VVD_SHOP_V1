/* eslint-disable react/prop-types */

import { Field } from "formik";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { GoSortDesc } from "react-icons/go";
const CateItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const isLeafNode = !item.children || item.children.length === 0;

  return (
    <div>
      <ul className="flex flex-col gap-2">
        <li className="cursor-pointer " onClick={handleToggle}>
          <label
            htmlFor={`category-${item.id}`}
            className={`flex rounded-md  items-center justify-between px-5 cursor-pointer hover:bg-gray-100 py-2 ${
              isOpen && "bg-gray-100"
            }`}
          >
            <div className="flex gap-2">
              {isLeafNode ? (
                <Field
                  type="radio"
                  id={`category-${item.id}`}
                  name="categoryId"
                  value={item?.id.toString()}
                />
              ) : (
                <GoSortDesc className="text-gray-400" size={20}></GoSortDesc>
              )}
              {item.name}
            </div>
            <div>{!isLeafNode && <FaAngleDown></FaAngleDown>}</div>
          </label>
        </li>
        {item.children && item.children.length > 0 && (
          <ul className={`ms-5 mb-2 ${isOpen ? "block" : "hidden"}`}>
            {item.children?.map((child) => (
              <CateItem key={child.id} item={child} />
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default CateItem;
