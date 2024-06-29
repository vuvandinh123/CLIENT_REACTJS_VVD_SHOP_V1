import { Loader, Sidebar } from "../../components/common";
import Hotdeals from "./components/Hotdeals";
import Recomended from "./components/Recomended";
import FeaturedProducts from "./components/FeaturedProducts";
import TopSellingProducts from "./components/TopSellingProducts";
import Contents from "./components/Contents";
import { useApiCall, useScrollTop } from "../../hooks";
import useTitle from "../../hooks/useTitle";
import { getHotSaleProduct } from "../../service/Product";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  useScrollTop();
  useTitle("Trang chủ | VVD SHOP");

  const recomended = [];
  const post = [];
  return (
    <div className="bg-[#F1F5F6]">
      
      <div className="max-w-[1410px] relative px-5 py-5 mx-auto ">
        <div className="flex flex-wrap lg:flex-nowrap lg:flex-row mt-2 gap-5 w-[100%]">
          <div className=" shrink-0 w-[250px] hidden lg:block">
            <Sidebar />
          </div>
          <Contents />
        </div>
        <Hotdeals />
        <FeaturedProducts />
        <div className="lg:my-20 my-10 relative">
          <div className="relative ">
            <img
              className="h-full min-h-[100px]"
              src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_4.png?v=1673237940&width=2000"
              alt=""
            />
            <div className="absolute top-[25px] left-10 text-white">
              <p className="uppercase">
                apply card today and{" "}
                <span className="text-yellow-500 font-bold">get discount</span>
              </p>
              <p className="text-gray-400">
                In rewards on you first dat of purchase when you are approvend
                for the card
              </p>
            </div>
          </div>
        </div>
        <TopSellingProducts />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 ">
          <div className="w-full group overflow-hidden rounded-md relative">
            <a href="">
              <img
                className="group-hover:scale-105 transition-all duration-300"
                src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_5_540x.jpg?v=1673624736"
                alt=""
              />
              <div className="absolute top-10 left-10 z-20 text-white text-xl">
                <p className="text-2xl font-semibold">Máy chơi game</p>
                <p>
                  <span className="text-yellow-400 font-bold">Giảm 20%</span>{" "}
                  Sản phẩm
                </p>
                <p className="text-gray-300 text-[13px]">Miễn phí ships</p>
              </div>
            </a>
          </div>
          <div className="w-full group overflow-hidden relative rounded-md">
            <a href="">
              <img
                className="group-hover:scale-105 transition-all duration-300"
                src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_6_540x.jpg?v=1675702823"
                alt=""
              />
              <div className="absolute top-10 left-10 z-20 text-white text-xl">
                <p className="text-2xl font-semibold">Máy ảnh </p>
                <p>
                  <span className="text-yellow-400 font-bold">
                    Giảm giá 80%
                  </span>{" "}
                </p>
                <p className="text-gray-300 text-[13px]">
                  Miễn phí ship toàn quốc
                </p>
              </div>
            </a>
          </div>
          <div className="w-full group overflow-hidden relative rounded-md">
            <a href="">
              <img
                className="group-hover:scale-105 transition-all duration-300"
                src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_7_540x.jpg?v=1675702834"
                alt=""
              />
              <div className="absolute top-10 left-10 z-20 text-white text-xl">
                <p className="text-2xl font-semibold">Máy tính bảng</p>
                <p>
                  <span className="text-yellow-400 font-bold">
                    Giảm đến 1 triệu đồng
                  </span>{" "}
                </p>
                <p className="text-gray-300 text-[13px]">
                  Free shipping 20km Radius
                </p>
              </div>
            </a>
          </div>
        </div>
        <Recomended
          data={recomended.data?.data?.data}
          loading={recomended.loading}
        />
      </div>
    </div>
  );
};

export default HomePage;
