/* eslint-disable react/prop-types */
import { ImageLoader } from "../common";
import { Link } from "react-router-dom";
import plus from "../../../public/plus.svg";
import minus from "../../../public/minus.svg";
import { formatPriceVND } from "../../utils";
const CartItem = ({
  data,
  handleClickDeleteCartItem,
  hanldeClickPlus,
  hanldeClickMinus,
}) => {
  return (
    <div className="flex justify-between gap-3  items-start p-5 border-b">
      <div className="flex gap-2">
        <div className="w-28 shrink-0 p-2 relative min-h-[100px]">
          <Link to={`/products/${data.slug}-${data.id}`}>
            <ImageLoader className="" src={data.thumbnail} alt={data.name} />
          </Link>
        </div>
        <div className="">
          <h3 className="font-medium">
            <Link
              className="text_ecl-2 hover:text-blue-500 transition-all"
              to={`/products/${data.slug}-${data.id}`}
            >
              {data.name}
            </Link>{" "}
          </h3>
          {data?.code ? (
            <span className="text-gray-400">sku: {data?.code}</span>
          ) : null}

          <div className="flex items-center gap-2">
            <span
              className={`${
                data.fix_price ? "text-red-500" : "text-[#2b38d1]"
              } text-[1rem] font-bold my-2`}
            >
              {formatPriceVND(data.price)}
            </span>
            {data?.fix_price && (
              <span className="text-gray-400 line-through text-sm font-semibold my-2">
                {formatPriceVND(data.fix_price)}
              </span>
            )}
          </div>

          <div className="">
            <div className="flex items-center w-44">
              <button
                onClick={() =>
                  hanldeClickMinus(data.cart_item_id, data.quantity)
                }
                className="px-2 group py-1 border "
              >
                <img src={minus} alt="" />
              </button>
              <input
                value={data.quantity}
                className="outline-none  py-1 w-14 bg-[#F1F5F6] border text-center"
                type="text"
              />
              <button
                onClick={() =>
                  hanldeClickPlus(data.cart_item_id, data.quantity)
                }
                className=" px-2 py-1 border group"
              >
                <img src={plus} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span
          onClick={() => handleClickDeleteCartItem(data.cart_item_id)}
          className="cursor-pointer hover:text-red-600"
        >
          <i className="fa-regular fa-trash-can"></i>
        </span>
      </div>
    </div>
  );
};

export default CartItem;
