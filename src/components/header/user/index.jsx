import { useAuth } from "../../../hooks";
import LoginUser from "./User.jsx";
import NoUser from "./NoUser.jsx";

const User = () => {
  const { user } = useAuth();
  if (!user) {
    return <NoUser />;
  }
  return (
    <>
      <LoginUser user={user} />
    </>
  );
};

export default User;
