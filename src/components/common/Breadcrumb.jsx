/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ data }) => {
  return (
    <div>
      <div className="flex items-center py-1 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Link to={"/"} href="#" className="text-gray-600 flex gap-2 hover:text-gray-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <span className="mx-3 text-gray-500 rtl:-scale-x-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        {data &&
          data?.length > 0 &&
          data?.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              {index + 1 === data.length ? (
                <span className="text-gray-600 max-w-[500px] truncate ">{item.name}</span>
              ) : (
                <Link to={item.link} className="text-gray-600 hover:text-gray-800">
                  {item.name}
                </Link>
              )}
              {index + 1 !== data.length && (
                <span className="mx-5 text-gray-500 rtl:-scale-x-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
