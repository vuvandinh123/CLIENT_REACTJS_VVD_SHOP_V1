/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getUrlSearchParam, setUrlSearchParam } from "../../../utils";
import { statusOrder } from "../data";

const TabOrder = ({ type, setType }) => {
  
  useEffect(() => {
    const typeParam = getUrlSearchParam("type");
    if (typeParam) {
      setType(typeParam);
    }
  }, [type]);
  const handleChangeStatus = (value) => {
    setType(value);
    setUrlSearchParam("type", value);
  };
  return (
    <div className="">
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>
        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Settings</option>
          <option>Messages</option>
          <option>Archive</option>
          <option>Notifications</option>
        </select>
      </div>
      <div className="hidden sm:block ">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex gap-6 overflow-auto scroll-h-3"
            aria-label="Tabs"
          >
            <span
              onClick={() => handleChangeStatus("ALL")}
              className={`${
                type === "ALL"
                  ? "text-blue-500 border-blue-500"
                  : "text-gray-500 border-transparent"
              } inline-flex cursor-pointer shrink-0 items-center gap-2 border-b-2  px-1 pb-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700`}
            >
              Tất cả
            </span>
            {statusOrder.map((item, index) => (
              <span
                key={index}
                onClick={() => handleChangeStatus(item.code)}
                className={`${
                  type === item.code
                    ? "text-blue-500 border-blue-500"
                    : "text-gray-500 border-transparent"
                } inline-flex cursor-pointer shrink-0 items-center gap-2 border-b-2  px-1 pb-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700`}
              >
                {item.name}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabOrder;
