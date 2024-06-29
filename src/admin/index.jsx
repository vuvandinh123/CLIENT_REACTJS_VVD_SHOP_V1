/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkRole } from "../helpers/utils";
import SidebarAdmin from "./components/common/SidebarAdmin";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";

const Admin = ({ children }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("USER");
  useEffect(() => {
    if (checkRole("ADMIN")) {
      setRole("ADMIN");
    } else if (checkRole("SHOP")) {
      setRole("SHOP");
    } else {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="bg-gray-50">
      <div className="flex overflow-hidden  ">
        {/* header */}
        <Header></Header>
        {/* Mobile sidebar */}
        {role === "ADMIN" && <SidebarAdmin></SidebarAdmin>}
        {role === "SHOP" && <Sidebar></Sidebar>}
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="pt-6 px-4 min-h-[600px]">{children}</div>
          </main>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Admin;
