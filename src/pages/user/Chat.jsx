import { useEffect, useState } from "react";
import Chats from "../../components/chats";
import LayoutUser from "./components/LayoutUser";
import { getCookieAuth, getUrlSearchParam } from "../../utils";
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
      <LayoutUser>
        <Chats storeId={data.storeId} userId={data.userId}></Chats>
      </LayoutUser>
      {/* component */}
    </div>
  );
};

export default Chat;
