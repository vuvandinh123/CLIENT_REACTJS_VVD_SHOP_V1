/* eslint-disable react/prop-types */
import { FiMinus, FiPlus } from "react-icons/fi";
import { ChangePrice } from "../../../components/common";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { formatPriceVND } from "../../../utils";

const CartItem = ({
  data,
  handleClickDeleteCartItem,
  hanldeClickPlus,
  hanldeClickMinus,
  productIds,
  setProductIds,
  shopId,
  setCode,
}) => {

  const handleCheck = (event, itemId) => {
    if (event.target.checked) {
      const newProductCheck = {
        ...productIds,
        [shopId]: [
          ...(productIds[shopId] || []),
          {
            id: itemId,
            code: data.code || null,
          },
        ],
      };
      setProductIds(newProductCheck);
    } else {
      const newProductCheck = {
        ...productIds,
        [shopId]: productIds[shopId].filter((item) => {
          return item.code !== data.code || item.id !== itemId;
        }),
      };
      setProductIds(newProductCheck);
      setCode("");
    }
  };
  return (
    <div className="py-5 px-2 border-b border-t grid grid-cols-12 justify-center items-center">
      <div className=" col-span-7  w-full flex gap-x-3">
        {/* checkbox */}
        <div className="flex items-center">
          <Checkbox onChange={(e) => handleCheck(e, data.id)}></Checkbox>
        </div>
        {/* Image */}
        <div className="w-[100px] flex-shrink-0 overflow-hidden">
          <Link to={`/products/${data?.slug}-${data?.id}`}>
            <img
              className="w-full  hover:scale-110 transition-all duration-200"
              src={data.thumbnail}
              alt=""
            />
          </Link>
        </div>
        {/* name and price */}
        <div>
          <h5 className="">
            <Link
              title={data.name}
              to={`/products/${data.slug}-${data.id}`}
              className="hover:text-blue-500 text_ecl-2"
            >
              {data.name}{" "}
            </Link>{" "}
            <span className="text-gray-500">
              {data.code ? "sku: " + data.code : null}
            </span>
          </h5>
          <div className="flex gap-2 items-center mt-2">
            <span className="font-bold hidden md:block text-[14px] tracking-wider text-red-500 mt-3 ">
              {formatPriceVND(data.fix_price ?? Number(data.price))}
            </span>
          </div>
        </div>
      </div>
      {/* change quantity */}
      <div className="md:flex items-center justify-center   col-span-2 ">
        <div className="justify-center font-bold flex items-center">
          <button
            onClick={() => {
              hanldeClickMinus(data.cart_item_id, data.quantity);
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
            }}
            className=" px-2 py-1  group"
          >
            <FiPlus />
          </button>
        </div>
      </div>
      {/* total price product */}
      <div className="col-span-2  text-center  font-bold">
        {data?.fix_price ? (
          <>
            <span className="text-gray-400 me-3 line-through ">
              {formatPriceVND(data?.fix_price * data?.quantity)}
            </span>
            <span className="text-red-500">{formatPriceVND(data.amount)}</span>
          </>
        ) : (
          formatPriceVND(data.amount)
        )}
      </div>
      {/* action */}
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
