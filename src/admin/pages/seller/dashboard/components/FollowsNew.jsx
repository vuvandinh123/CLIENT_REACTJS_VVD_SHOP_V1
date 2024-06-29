import React, { useState } from "react";
import { useApiCall } from "../../../../../hooks";
import { getFollowNewShop } from "../../../../service/Follow";
import noimage from "../../../../../assets/imageNotFound.png";
const FollowsNew = () => {
  const { data } = useApiCall(async () => {
    const res = await getFollowNewShop();
    return res.data;
  });
  return (
    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900">
          Người theo dõi mới
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
        >
          Xem tất cả
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {data?.map((item, index) => (
            <li key={index} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={item.image}
                    onError={(e) => {
                      e.target.src = noimage;
                      e.target.onerror = null;
                    }}
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.lastName + " " + item.firstName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{item.email}</p>
                </div>
              </div>
            </li>
          ))}
          {
            data.length == 0 && <div className="text-center text-gray-500 text-sm flex justify-center items-center h-full">Không có người theo dõi</div>
          }
        </ul>
      </div>
    </div>
  );
};

export default FollowsNew;
