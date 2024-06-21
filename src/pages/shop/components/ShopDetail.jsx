/* eslint-disable react/prop-types */
import moment from "moment";
import { useEffect, useState } from "react";
import {
  getIsFollowShop,
  getShopById,
  toggleFollowShop,
} from "../../../service/Shop";
import { useApiCall } from "../../../hooks";

const ShopDetail = ({ shopId }) => {
  const [shop, setShop] = useState({});
  const [followe, setFollowe] = useState(false);
  useEffect(() => {
    const fetchAPi = async () => {
      try {
        const res = await getIsFollowShop(shopId);
        setFollowe(res.data);
      } catch (error) {
        console.log(error, "hiii");
      }
    };
    if (shopId) {
      fetchAPi();
    }
  }, [shopId]);
  const handleClickFollow = async () => {
    try {
      const res = await toggleFollowShop(shopId);
      if (res.data) {
        setFollowe(!followe);
      }
    } catch (error) {
      console.log(error, "hiii");
    }
  };
  const { loading } = useApiCall(async () => {
    const [shop] = await Promise.all([getShopById(shopId)]);
    setShop(shop.data);
    return shop.data;
  }, [shopId]);
  return (
    <div className="flex flex-col">
      <div className="bg-white   p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex-none col-span-1 sm:flex">
            <div className=" relative h-32 w-32   sm:mb-0 mb-3">
              <img
                src={shop.logo}
                alt="aji"
                className=" w-32 h-32 object-cover rounded-2xl"
              />
              <a
                href="#"
                className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </a>
            </div>
            <div className="flex-auto sm:ml-5 justify-evenly">
              <div className="flex items-center justify-between sm:mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                      {shop.name}
                    </div>
                    <div className="flex-auto text-gray-500 my-1">
                      <span className="mr-3 ">@{shop.username}</span>
                      <span className="mr-3 border-r border-gray-200  max-h-0" />
                      <span>
                        <span className=""> {shop.email}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`h-5 w-5  ${
                        shop.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-500 ml-1 text-[11px]">
                    ({shop.rating})
                  </span>
                </div>
              </div>
              <div className="flex pt-2 gap-5 text-sm text-gray-500">
                <div className=" inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <p className="shrink-0">{shop.follower} Người theo dõi</p>
                  <button
                    onClick={handleClickFollow}
                    className={` shrink-0  bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white uppercase rounded-full transition ease-in duration-300 ${
                      followe &&
                      "!bg-gray-100 hover:!bg-gray-200 !text-gray-800 !border-gray-300"
                    }`}
                  >
                    {followe ? "BỎ THEO DÕI" : "THEO DÕI"}
                  </button>
                </div>
                <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className>{shop.total_product} Sản phẩm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div>
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <tr>
                  <td>
                    <p className="py-3">
                      Địa chỉ:{" "}
                      <span className="font-bold text-gray-800">
                        {shop.address}
                      </span>
                    </p>
                    <p className="py-3">
                      Số điện thoại:{" "}
                      <span className="font-bold text-gray-800">
                        {shop.phone}
                      </span>
                    </p>
                    <p className="py-3">
                      Email:{" "}
                      <span className="font-bold text-gray-800">
                        {shop.email}
                      </span>
                    </p>
                  </td>
                  <td>
                    <p className="py-3">
                      Sản phẩm đã bán:{" "}
                      <span className="font-bold text-gray-800">12</span>
                    </p>
                    <p className="py-3">
                      Thời gian hoạt động:{" "}
                      <span className="font-bold text-gray-800">24/7</span>
                    </p>
                    <p className="py-3">
                      Tham gia:{" "}
                      <span className="font-bold text-gray-800">
                        {" "}
                        {moment(shop.created_at).fromNow()}
                      </span>
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
