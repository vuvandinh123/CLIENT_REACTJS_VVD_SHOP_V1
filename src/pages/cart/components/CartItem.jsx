/* eslint-disable react/prop-types */
import { FiMinus, FiPlus } from "react-icons/fi";
import { ChangePrice } from "../../../components/common";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { formatPriceVND } from "../../../utils";
import { useEffect } from "react";

const CartItem = ({
  data,
  handleClickDeleteCartItem,
  hanldeClickPlus,
  hanldeClickMinus,
  productIds,
  setProductIds,
  setTotal,
}) => {
  const handleCheck = (e, id) => {
    if (e.target.checked) {
      const newProductCheck = [...productIds, id];
      setProductIds(newProductCheck);
    } else {
      const newProductCheck = productIds.filter((item) => item !== id);
      setProductIds(newProductCheck);
    }
  };
  return (
    <div className="py-5 px-2 border-b border-t grid grid-cols-12 justify-center items-center">
      <div className=" col-span-5  w-full flex gap-x-3">
        <div className="flex items-center">
          <Checkbox
            onChange={(e) => handleCheck(e, data.id)}
          ></Checkbox>
        </div>
        <div className="w-[100px] flex-shrink-0 overflow-hidden">
          <Link to={`/products/${data?.slug}`}>
            <img
              className="w-full  hover:scale-110 transition-all duration-200"
              src={data.thumbnail}
              alt=""
            />
          </Link>
          <ChangePrice
            className="font-bold md:hidden  text-[14px] tracking-wider text-red-500 mt-3 "
            price={data.fix_price ?? data.price}
          />
        </div>
        <div>
          <h5 className="">
            <Link
              title={data.name}
              to={`/products/${data.slug}-${data.id}`}
              className="hover:text-blue-500 text_ecl-2"
            >
              {data.name}{" "}
            </Link>{" "}
          </h5>
          <div className="flex gap-2 items-center mt-2">
            <ChangePrice
              className="font-bold hidden md:block text-[14px] tracking-wider text-red-500 mt-3 "
              price={data.fix_price ?? data.price}
            />
          </div>

          <div className="md:hidden  w-24 flex flex-col gap-3">
            <div className="justify-center my-1  border font-bold flex items-center">
              <button
                onClick={() => hanldeClickMinus(data.id)}
                className="px-2 group py-1  "
              >
                <FiMinus />
              </button>
              <input
                value={data.quantity}
                className="outline-none  py-1 w-10   text-center"
                type="text"
              />
              <button
                onClick={() => {
                  hanldeClickPlus(data.cart_item_id);
                  setTotal((prev) => prev + data.price);
                }}
                className=" px-2 py-1  group"
              >
                <FiPlus />
              </button>
            </div>
            <div className=" text-left  font-bold ">
              Total: <ChangePrice price={data.amount} />
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex hidden items-center justify-center   col-span-2 ">
        <div className="justify-center font-bold flex items-center">
          <button
            onClick={() => {
              hanldeClickMinus(data.cart_item_id, data.quantity);
              if (data.quantity > 1) {
                setTotal((prev) => prev - data.price);
              }
            }}
            className="px-2 group py-1  "
          >
            <FiMinus />
          </button>
          <input
            value={data.quantity}
            className="outline-none  py-1 w-14   text-center"
            type="text"
          />

          <button
            onClick={() => {
              hanldeClickPlus(data.cart_item_id, data.quantity);
              setTotal((prev) => prev + data.price);
            }}
            className=" px-2 py-1  group"
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="col-span-2  text-center  font-bold">
        {data?.fix_price ? (
          <>
            <span className="text-gray-500 me-3 line-through ">
              {data?.fix_price * data?.quantity}
            </span>
            <span className="text-red-500">{formatPriceVND(data.amount)}</span>
          </>
        ) : (
          formatPriceVND(data.amount)
        )}

        <input type="hidden" name="amount" />
      </div>
      <div className=" group relative  col-span-2 hidden md:block">
        <span>Thêm voncher</span>
        <div className="absolute mt-3 invisible opacity-0 transition-all duration-200 translate-y-10 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 top-full right-0 bg-white border rounded-lg shadow-lg p-3 before:content-[''] before:absolute before:w-0 before:h-0 before:border-8 before:border-transparent before:border-b-blue-500 before:top-0 before:right-10 before:translate-y-[-100%]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="border uppercase border-blue-500 rounded-md outline-blue-600 px-3 py-2"
            />
            <button className="px-3 py-2 bg-blue-500 text-white rounded-md">
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className=" col-span-1 text-end   font-bold">
        <span
          title="Xóa"
          onClick={() => handleClickDeleteCartItem(data.cart_item_id)}
          className="cursor-pointer hover:text-red-500 px-4 py-2 transition-all"
        >
          <i className="fa-regular fa-trash-can"></i>
        </span>
      </div>
    </div>
  );
};

export default CartItem;
