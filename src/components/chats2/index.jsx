/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Siderbar from "./components/Siderbar";
import ChatInput from "./components/ChatInput";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import ChatMessage from "./components/ChatMessage";
import { getUrlSearchParam } from "../../utils";

const Chats2 = ({ userId, storeId,setData ,shop,user}) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const messagesRef = ref(database, `messages/${userId}_${storeId}`);
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      const loadedMessages = [];
      for (const key in messagesData) {
        loadedMessages.push({ id: key, ...messagesData[key] });
      }
      setMessages(loadedMessages);
    });

    // return () => {
    //   messagesRef?.off();
    // };
  }, [userId, storeId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex bg-white rounded-md h-screen overflow-hidden">
        {/* Sidebar */}
        <Siderbar setData={setData}  userId={userId}></Siderbar>
        {/* Main Chat Area */}
        {!storeId && (
          <div className="w-full flex justify-center mt-10 items-start">
            <h1 className="text-2xl text-gray-500 font-semibold">
              Bạn cần chọn một cửa hàng để trò chuyện
            </h1>
          </div>
        )}
        {storeId && (
          <div className=" w-full flex flex-col">
            {/* Chat Header */}
            <header className="bg-white  p-4 border-b text-gray-700 flex gap-3 items-center">
              <img src={shop?.shop_logo} className="w-8 h-8 border rounded-full" alt="" />
              <h3 className="text-xl font-semibold">{shop?.shop_name}</h3>
            </header>
            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
              {/* Incoming Message */}
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  user={user}
                  message={message}
                  shop={shop}
                  storeId={storeId}
                />
              ))}
              {
                messages.length === 0 && (
                  <div className="h-full flex justify-center items-center">
                    <h1 className="text-2xl text-gray-500 font-semibold">Chưa có tin nhắn</h1>
                  </div>
                )
              }
              {/* <div ref={messagesEndRef}></div> */}
            </div>
            {/* Chat Input */}
            <ChatInput storeId={storeId} userId={userId}></ChatInput>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats2;
