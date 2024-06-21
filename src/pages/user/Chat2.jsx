import { useEffect, useState } from "react";
import Chats from "../../components/chats";
import LayoutUser from "./components/LayoutUser";
import { getCookieAuth, getUrlSearchParam } from "../../utils";
import { Loader } from "../../components/common";
import Chats2 from "../../components/chats2";
import { useLocation } from "react-router-dom";
import { getShopChatsByIds } from "../../service/Shop";
import { getShopByUserId } from "../../admin/service/Shop";
import { useAuth } from "../../hooks";

const Chat = () => {
  const [data, setData] = useState({
    storeId: 1,
    userId: 61,
  });
  const [shop, setShop] = useState({});
  const getShopById = async (id) => {
    const res = await getShopByUserId(id);
    setShop(res.data);
  };
  const { user } = useAuth();
  // const l
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { userId } = getCookieAuth();
    const storeId = getUrlSearchParam("store");
    if (storeId) {
      getShopById(storeId);
    }
    setData({ storeId, userId });
    setLoading(false);
  }, []);
  if (loading) return <Loader />;
  return (
    <div>
      <LayoutUser>
        <Chats2
          shop={shop}
          storeId={data.storeId}
          setData={setData}
          user={user}
          userId={data.userId}
        ></Chats2>
      </LayoutUser>
      {/* component */}
    </div>
  );
};

export default Chat;
