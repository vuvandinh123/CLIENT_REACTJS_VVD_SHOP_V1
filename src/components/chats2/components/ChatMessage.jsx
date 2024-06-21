/* eslint-disable react/prop-types */
// src/ChatMessage.js

import React from "react";
import { formathDate } from "../../../utils";

const ChatMessage = ({ message, storeId, user,shop }) => {
  console.log(user,"shop");
  return (
    <div
      className={`flex items-center gap-3  mb-4 cursor-pointer ${
        storeId != message.sender
          ? "justify-end  flex-row-reverse"
          : "justify-end"
      }`}
    >
      <div
        className={`flex gap-2 items-center ${
          storeId == message.sender && "flex-row-reverse"
        }`}
      >
        <div
          className={` ${
            storeId != message.sender
              ? "bg-gray-200 text-gray-800"
              : "bg-indigo-500 text-white"
          }  max-w-96   rounded-lg py-2 px-5 gap-3`}
        >
          <p className="">{message.text}</p>
        </div>
        <p className="text-gray-400 text-[10px]">
          {formathDate(message.timestamp)}
        </p>
      </div>

      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src={storeId == message.sender ? user?.image === null ? "https://via.placeholder.com/200" : user?.image : shop?.shop_logo}
          alt="My Avatar"
          onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatMessage;
