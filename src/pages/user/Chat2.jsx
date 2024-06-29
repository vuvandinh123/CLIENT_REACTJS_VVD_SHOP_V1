import { useEffect, useState } from "react";
import LayoutUser from "./components/LayoutUser";
import { getCookieAuth, getUrlSearchParam } from "../../utils";
import { Loader } from "../../components/common";
import Chats2 from "../../components/chats2";
import { useAuth } from "../../hooks";
import { getShopByUserId } from "../../seller/service/Shop";

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
  }, [data.storeId]);
  if (loading) return <Loader />;
  return (
    <div>
      <Chats2
        shop={shop}
        storeId={data.storeId}
        setData={setData}
        user={user}
        userId={data.userId}
      ></Chats2>
    </div>
  );
};

export default Chat;
