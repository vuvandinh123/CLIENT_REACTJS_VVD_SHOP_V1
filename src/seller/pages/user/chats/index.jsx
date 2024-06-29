import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import Chats2 from "../../../../components/chats2";
import { useLocation } from "react-router-dom";
import { getCookieAuth, getUrlSearchParam } from "../../../../utils";
import { useApiCall, useAuth, useScrollTop } from "../../../../hooks";
import { getShopId } from "../../../service/Shop";
import { Loader } from "../../../../components/common";
import Chats from "../../../../components/chats";
import { getUserById } from "../../../service/User";

const ChatsAdmin = () => {
  useScrollTop();
  const [data, setData] = useState({
    storeId: 1,
    userId: 61,
  });
  const [user, setUser] = useState(null);
  const { data: shop } = useApiCall(async () => {
    const { userId } = getCookieAuth();
    const res = await getShopId(userId);
    return res.data;
    // return null;
  }, []);

  const getUserId = async (id) => {
    const res = await getUserById(id);
    setUser(res.data);
  };
  // const l
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { userId } = getCookieAuth();
    const user = getUrlSearchParam("user");
    if (user) {
      getUserId(user);
    }
    setData({ storeId: userId, userId: user });
    setLoading(false);
  }, [data.userId]);
  if (loading) return <Loader />;
  return (
    <div className="mt-20">
      <Chats
        shop={shop}
        storeId={data.storeId}
        setData={setData}
        user={user}
        userId={data.userId}
      ></Chats>
    </div>
  );
};

export default ChatsAdmin;
