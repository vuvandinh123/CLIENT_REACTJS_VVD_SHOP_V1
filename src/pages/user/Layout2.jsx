import { Route, Routes } from "react-router-dom";
import LayoutUser from "./components/LayoutUser";
import User from "./index";
import OrderDetail from "./OrderDetail";
import ChangePassword from "./ChangePassword";
import Chat from "./Chat2";
import AddressUser from "./AddressUser";
const LayoutUser2 = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<User />}></Route>
          <Route path="purchase" element={<OrderDetail />}></Route>
          <Route path="chats" element={<Chat />}></Route>
          <Route path="change-password" element={<ChangePassword />}></Route>
          <Route path="order-address" element={<AddressUser />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default LayoutUser2;
