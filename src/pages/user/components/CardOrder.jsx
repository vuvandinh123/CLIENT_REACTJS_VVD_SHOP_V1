/* eslint-disable react/prop-types */
import { Avatar } from "keep-react";
import { Chat } from "phosphor-react";
import { CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";
import { formatPriceVND } from "../../../utils";
import { statusOrder } from "../data";

const CardOrder = ({ data, handleClickOrder,index }) => {
  return (
    <div className="bg-white p-5 rounded-lg mb-2">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CiShop size={25}></CiShop>
            <Link
              to={`/shop/${data.id}`}
              className="font-semibold text-gray-700"
            >
              {data?.name}
            </Link>
            <Link to={`/user/chats?store=${data.id}`}>
              <span className="flex gap-2 items-center px-3  h-7 bg-red-50 hover:text-red-500 text-red-500 hover:bg-red-100 border border-red-300">
                <Chat color="red" size={20}></Chat>
                Nhắn tin
              </span>
            </Link>
            <Link to={`/shop/${data.id}`}>
              <span className=" px-3 py-1 text-gray-600 hover:text-blue-500 hover:bg-gray-50 border border-gray-300">
                Xem Shop
              </span>
            </Link>
          </div>
          <div>
            {/* trangj thai don hang */}
            <span className="text-red-500  px-3 py-1 uppercase">
              {statusOrder.find((item) => item.code === data.status)?.name}
            </span>
          </div>
        </div>
        {data.products.map((item, index) => (
          <div key={index} className="border-y mt-3 p-3">
            <div className="flex gap-3 justify-between items-center">
              <div className="flex gap-3">
                <div className="">
                  <Avatar shape="rounded" img={item.thumbnail} />
                </div>
                <div className="">
                  <h3>{item.product_name}</h3>
                  <p className="text-gray-500">
                    {item.code ? `sku: ${item.code}` : null}
                  </p>
                  <p className="text-gray-500">Số lượng: {item.quantity}</p>
                </div>
              </div>
              <div className="text-red-500">
                {formatPriceVND(Number(item.product_price))}
              </div>
            </div>
          </div>
        ))}

        <div className="p-3 mt-3">
          <div className="flex justify-end gap-4 text-lg items-center">
            <span className="text-gray-600">Thành tiền:</span>{" "}
            <span className="text-red-500  font-bold">
              {formatPriceVND(Number(data.total_amount))}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-end gap-2  items-center">
            <button
              className="px-5 py-1 uppercase bg-red-500 text-white rounded-sm"
              onClick={()=>handleClickOrder(index)}
            >
              Mua lại
            </button>
            {/* <Link
              className="px-5 py-1 uppercase bg-blue-500 text-white rounded-sm"
              to={"/user/checkout"}
            >
              Xem chi tết
            </Link> */}
            <Link
              className="px-5 py-1 uppercase border border-gray-200 hover:bg-gray-100 rounded-sm"
              to={"/user/chats?store=" + data.id}
            >
              Liên hệ người bán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
