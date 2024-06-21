/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { getShopChatsByIds } from "../../../service/Shop";
import { setUrlSearchParam } from "../../../utils";
import { getChatsUserShop } from "../../../admin/service/UserFollow";

const Siderbar = ({ storeId,setData }) => {
  const [stores, setStores] = useState([]);
  const getStores = async (ids) => {
    const res = await getChatsUserShop({ userIds: ids });
    setStores(res.data);
  };
  useEffect(() => {
    const userChatsRef = ref(database, `storeChats/${storeId}`);
    onValue(userChatsRef, (snapshot) => {
      const storeData = snapshot.val();
      const storeList = storeData ? Object.keys(storeData) : [];
      getStores(storeList);
    });
  }, [storeId]);
  const handleClickChangeStore = (item) => {
    setUrlSearchParam("user", item.id);
    setData((item2) => ({ ...item2, userId: item.id}));
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
          <div
            id="menuDropdown"
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
          >
            <ul className="py-2 px-3">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                >
                  Option 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                >
                  Option 2
                </a>
              </li>
              {/* Add more menu options here */}
            </ul>
          </div>
        </div>
      </header>
      {/* Contact List */}
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {stores?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickChangeStore(item)}
            className="flex  items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src={item.image === null ? "https://via.placeholder.com/150" : item.image}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                  e.target.onerror = null;
                }}
                
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.lastName + " " + item.firstName}</h2>
              <p className="text-gray-600">Phản hồi ngay!!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Siderbar;
