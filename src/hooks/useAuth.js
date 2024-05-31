import { useEffect, useState } from "react";
import Auth from "../service/Auth";
import { getCookieAuth } from "../utils";

export default function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { accessToken } = getCookieAuth();
    const fetchUserData = async () => {
      const res = await Auth.getUser()
      setUser(res.data);
    };
    if (accessToken) {
      fetchUserData()
    }
  }, []);
  return {
    user
  }
}