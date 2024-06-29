/* eslint-disable react/prop-types */

import { Field } from "formik";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
const CateItem = ({ item, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const isLeafNode = !item.children || item.children.length === 0;

  return (
    <div>
      <ul className="flex flex-col gap-2">
        <li className="cursor-pointer flex items-center justify-between">
          <label
            htmlFor={`category-${item.id}`}
            className={`flex rounded-md w-full   px-5 cursor-pointer hover:bg-gray-100 py-2 ${
              isOpen && "bg-gray-100"
            }`}
          >
            <div className="flex gap-2">
              {/* {isLeafNode ? ( */}
              <Field
                type="radio"
                id={`category-${item.id}`}
                name={name ?? "categoryId"}
                value={item?.id.toString()}
              />
              {/* ) : (
                <GoSortDesc className="text-gray-400" size={20}></GoSortDesc>
              )} */}
              {item.name}
            </div>
          </label>
          {!isLeafNode && (
            <div
              className="px-5 hover:bg-green-100 py-3"
              onClick={handleToggle}
            >
              {<FaAngleDown></FaAngleDown>}
            </div>
          )}
        </li>
        {item.children && item.children.length > 0 && (
          <ul className={`ms-5 mb-2 ${isOpen ? "block" : "hidden"}`}>
            {item.children?.map((child) => (
              <CateItem key={child.id} item={child} name={name} />
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default CateItem;
