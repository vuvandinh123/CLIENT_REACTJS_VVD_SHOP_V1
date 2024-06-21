/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { getShopChatsByIds } from "../../../service/Shop";
import { setUrlSearchParam } from "../../../utils";
const Siderbar = ({ userId, setData }) => {
  const [stores, setStores] = useState([]);
  const getStores = async (ids) => {
    const res = await getShopChatsByIds({ shopIds: ids });
    setStores(res.data);
  };
  useEffect(() => {
    const userChatsRef = ref(database, `userChats/${userId}`);
    onValue(userChatsRef, (snapshot) => {
      const storeData = snapshot.val();
      const storeList = storeData ? Object.keys(storeData) : [];
      getStores(storeList);
    });
  }, [userId]);
  const handleClickChangeStore = (storeId) => {
    setUrlSearchParam("store", storeId);
    setData((item) => ({ ...item, storeId }));
  };
  return (
    <div className="w-2/4 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Nhắn tin</h1>
        <div className="relative">
          <button id="menuButton" className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {/* Menu Dropdown */}
         
        </div>
      </header>
      {/* Contact List */}
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {stores?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickChangeStore(item.user_id)}
            className="flex  items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src={item.logo}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Nhắn tin ngay!!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Siderbar;
