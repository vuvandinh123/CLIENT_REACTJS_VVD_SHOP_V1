import { useEffect, useState } from "react";
import Chats from "../../components/chats";
import LayoutUser from "./components/LayoutUser";
import { Loader } from "../../components/common";

const Chat = () => {
  const [data, setData] = useState({
    storeId: 1,
    userId: 61,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const { userId } = getCookieAuth();
    // const storeId = getUrlSearchParam("store") || 1;
    // setData({ storeId, userId });
    setLoading(false);
  }, []);
  if (loading) return <Loader />;

  return (
    <div>
      <Chats storeId={data.storeId} userId={data.userId}></Chats>
    </div>
  );
};

export default Chat;
