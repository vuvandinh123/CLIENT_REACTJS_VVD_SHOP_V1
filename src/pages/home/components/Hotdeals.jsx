import hotdeals from "../../../../public/svg/hotdel.svg";
import { PlacehoderCard } from "../../../components/common";
import SlickCround from "../../../components/common/SlickCround";
import CountDown from "./CountDown";
import { settingSlick } from "../../../helpers";
import PropTypes from "prop-types";
import Product from "../../../components/products/Product";

const Hotdeals = ({ data, loading }) => {
  const settings = settingSlick(6);
  console.log(loading);
  return (
    <div className="my-20">
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <img src={hotdeals} className="me-2" alt="" />
          <p className="text-base font-[300] text-[#6F7275]">
            <span className="text-red-600 me-2 uppercase font-bold ">
              Hot Deals!
            </span>
            GIÁ TỐT NHẤT
          </p>
        </div>
        <div>
          <div className="text-sm leading-4 flex items-center justify-between">
            <span className="me-3 text-[12px] lg:text-[14px]  text-[#424242]">
              Nhanh lên ! Ưu đãi sẽ kết thúc sau:
            </span>
            <CountDown />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap mt-3 gap-2">
        {/* <div className="lg:basis-1/3 w-full">
          <a href="#" className="overflow-hidden block rounded-md">
            <img
              className="w-full min-h-[380px]   hover:scale-105 transition-all duration-300"
              src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_3.png?v=1673017886&width=2000"
              alt=""
            />
          </a>
        </div> */}
        <div className=" w-full max-w-[100%] relative group/arrow">
          {!loading && data.length && (
            <SlickCround settings={settings}>
              {data?.map((item, index) => {
                return <Product data={item} key={index} deals={true} />;
              })}
            </SlickCround>
          )}
          {!loading && data.length === 0 && (
            <p className="text-gray-500 text-center py-5">Không có sản phẩm</p>
          )}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-2">
              {[...Array(6)].map((item, index) => (
                <PlacehoderCard key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
Hotdeals.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};
export default Hotdeals;
