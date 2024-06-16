/* eslint-disable react/prop-types */
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";
import { checkRole } from "../../helpers/utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LayoutAdmin = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkRole("SHOP")) {
      navigate("/admin/login");
    }
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="flex overflow-hidden  ">
        {/* header */}
        <Header></Header>
        {/* Mobile sidebar */}
        <Sidebar></Sidebar>

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

export default LayoutAdmin;
