/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Siderbar from "./components/Siderbar";
import ChatInput from "./components/ChatInput";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import ChatMessage from "./components/ChatMessage";

const Chats2 = ({ userId, storeId, setData, shop, user }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const messagesRef = ref(database, `messages/${userId}_${storeId}`);
    setLoading(true);
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      const loadedMessages = [];
      for (const key in messagesData) {
        loadedMessages.push({ id: key, ...messagesData[key] });
      }
      setTimeout(() => {
        setMessages(loadedMessages);
        setLoading(false);
      }, 500);
    });
  }, [userId, storeId]);
  return (
    <div>
      <div className="flex bg-white rounded-md h-screen overflow-hidden">
        {/* Sidebar */}
        <Siderbar setData={setData} userId={userId}></Siderbar>
        {/* Main Chat Area */}
        {loading && (
          <div className="w-full flex justify-center mt-10 items-start">
            <h1 className="text-xl flex items-center justify-center flex-col text-gray-500 font-semibold">
              <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
              <span className="mt-3">
              Đang tải...

              </span>
            </h1>
          </div>
        )}
        {!loading && !storeId && (
          <div className="w-full flex justify-center mt-10 items-start">
            <h1 className="text-2xl text-gray-500 font-semibold">
              Bạn cần chọn một cửa hàng để trò chuyện
            </h1>
          </div>
        )}
        {!loading && storeId && (
          <div className=" w-full flex flex-col">
            {/* Chat Header */}
            <header className="bg-white  p-4 border-b text-gray-700 flex gap-3 items-center">
              <img
                src={shop?.shop_logo}
                className="w-8 h-8 border rounded-full"
                alt=""
              />
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
              {messages.length === 0 && (
                <div className="h-full flex justify-center items-center">
                  <h1 className="text-2xl text-gray-500 font-semibold">
                    Chưa có tin nhắn
                  </h1>
                </div>
              )}
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
