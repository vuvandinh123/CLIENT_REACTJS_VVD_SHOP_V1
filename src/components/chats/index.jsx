/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Siderbar from "./components/Siderbar";
import ChatInput from "./components/ChatInput";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import ChatMessage from "./components/ChatMessage";

const Chats = ({ userId, storeId, setData ,user,shop}) => {
  const [messages, setMessages] = useState([]);
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
  }, [userId, storeId]);
  return (
    <div>
      <div className="flex bg-white rounded-md h-screen overflow-hidden">
        {/* Sidebar */}
        <Siderbar
          storeId={storeId}
          setData={setData}
        ></Siderbar>
        {/* Main Chat Area */}
        {userId && (
          <div className=" w-full overflow-hidden flex flex-col">
            {/* Chat Header */}
            <header className="bg-white border p-4 text-gray-700 flex items-center gap-3">
              <img src={user?.image === null ? "https://via.placeholder.com/200" : user?.image} className="w-9 h-9 rounded-full" alt="" />
              <h1 className="text-xl font-semibold">
                {user?.lastName + " " + user?.firstName}
              </h1>
            </header>
            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
              {/* Incoming Message */}
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  
                  userId={userId}
                  user={user}
                  shop={shop}
                />
              ))}
            </div>
            {/* Chat Input */}
            <ChatInput storeId={storeId} userId={userId}></ChatInput>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
