import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/animation.css";
import "./styles/slick.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import RouteApp from "./router/RouteApp";
import ModalSelectOptionCart from "./components/baskets/ModalSelectOptionCart";
import { useSelector } from "react-redux";
import i18n from "./language/LanguageSetting";
import { I18nextProvider } from "react-i18next";
import { getUrlSearchParam, setUrlSearchParam } from "./utils";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  const { isOpen } = useSelector((state) => state.selectCart);
  // kiểm tra thay đổi ngôn ngữ theo url hoặc localStorage
  useEffect(() => {
    if (getUrlSearchParam("lang")) {
      i18n.changeLanguage(getUrlSearchParam("lang"));
      localStorage.setItem("lang", getUrlSearchParam("lang"));
    } else {
      const lang = localStorage.getItem("lang");
      if (lang) {
        i18n.changeLanguage(lang);
        setUrlSearchParam("lang", lang);
      }
    }
  }, []);
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <RouteApp />
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryClientProvider>
      </I18nextProvider>
      {isOpen && <ModalSelectOptionCart></ModalSelectOptionCart>}
      <ToastContainer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
