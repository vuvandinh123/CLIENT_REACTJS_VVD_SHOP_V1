/* eslint-disable react/prop-types */
// src/ChatInput.js

import React, { useState } from "react";
import { database } from "../../../firebaseConfig";
import { ref, push, update } from "firebase/database";

const ChatInput = ({ userId, storeId }) => {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const messagesRef = ref(database, `messages/${userId}_${storeId}`);
    const newMessage = {
      text: text,
      sender: userId, // Thay thế bằng thông tin người gửi
      timestamp: new Date().toISOString(),
    };

    push(messagesRef, newMessage);

    // Lưu thông tin cuộc trò chuyện vào userChats và storeChats
    const userChatsRef = ref(database, `userChats/${userId}`);
    update(userChatsRef, { [storeId]: true });

    const storeChatsRef = ref(database, `storeChats/${storeId}`);
    update(storeChatsRef, { [userId]: true });

    setText("");
  };

  return (
    <footer className="bg-white border-t w-full  border-gray-300 p-4  bottom-0 ">
      <form action="" onSubmit={handleSend} method="post">
        <div className="flex items-center w-full">
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Gửi
          </button>
        </div>
      </form>
    </footer>
  );
};

export default ChatInput;
