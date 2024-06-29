/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from "react-loading-skeleton";
import {
  arraysMatch,
  formatPriceVND,
  getCookieAuth,
  setUrlSearchParam,
} from "../../../utils";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import { BsShield } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { FiHeart, FiLayers } from "react-icons/fi";
import { AiOutlineShareAlt } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountDown from "./CountDown";
import Variants from "./Variants";
import { useEffect, useState } from "react";
import { DiscountCard } from "../../../components/common";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { addToCart } from "../../../service/Cart";

const BoxContent = ({ data, setData, discount }) => {
  const [variantSelect, setVariantSelect] = useState({});
  const [qty, setQty] = useState(1);
  const [newData, setNewData] = useState({
    variant: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(variantSelect).length > 0) {
      let code = "";
      for (let key in variantSelect) {
        code += variantSelect[key] + ",";
      }
      const arr = code.split(",");
      arr.pop();
      data.variant.productVariants.filter((item) => {
        if (arraysMatch(arr, item.code.split("-"))) {
          setNewData({
            ...newData,
            variant: {
              variantSelect,
              code: item.code,
            },
          });
        }
      });
    }
  }, [variantSelect]);
  useEffect(() => {
    if (newData.variant) {
      data.variant.productVariants.forEach((item) => {
        if (item.code === newData.variant) {
          setData({
            ...data,
            price: Number(item.price),
            quantity: item.stock,
          });
          setUrlSearchParam("code", newData.variant);
          return;
        }
      });
    }
  }, [newData.variant]);
  const handleClickCheckOut = () => {
    let price = 0;
    if (data.type_price === "percent") {
      price = (1 - data.price_sale / 100) * data.price;
    } else {
      price = data.price - (data.price_sale || 0);
    }
    const checkout = [
      {
        order: {
          amount: price * qty,
          discount: null,
          products: [{ ...data, amount: price * qty, quantity: qty }],
          shopId: data.shop_id,
        },
      },
    ];
    sessionStorage.setItem("checkout", JSON.stringify(checkout));
    navigate("/checkout");
  };
  const handleClickToCart = async () => {
    const { userId } = getCookieAuth();
    if (!userId) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      navigate("/auth/login");
      return;
    }
    // setIsDisabled(true);
    if (data.type === "single") {
      const newCart = { productId: data.id, quantity: qty };
      await addToCart(newCart);
      navigate("/cart");
    } else {
      const newCart = {
        productId: data.id,
        quantity: qty,
        code: newData.variant.code,
      };
      await addToCart(newCart);
      navigate("/cart");
    }
  };
  return (
    <div className="basis-1/2">
      <div className="mt-5 md:mt-16">
        <h1 className="text-2xl my-2">
          {data?.name ? data?.name : <Skeleton width={"70%"} height={"25px"} />}
        </h1>
        <div className="flex flex-wrap border-b items-center gap-3 py-3 pb-6">
          <div className="flex items-center gapx-3 text-yellow-500">
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <FaStar
                  key={index}
                  size={20}
                  className={`${
                    index + 1 <= data.reviewRating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  {" "}
                </FaStar>
              ))}
          </div>
          <span>
            {data?.reviewRating && Number(data?.reviewRating || 4)?.toFixed(1)}
          </span>
          <span>/</span>
          <span className="text-[11px] md:text-[13px]">
            {data?.reviewCount || 0} Đánh giá
          </span>
        </div>
        <h3 className="text-red-500 flex gap-3 text-3xl mt-5 font-semibold">
          <span className="flex items-end gap-3">
            <span className="text-red-500 ">
              {data.type_price == "percent"
                ? formatPriceVND(data?.price * (1 - data.price_sale / 100))
                : formatPriceVND(data?.price - data.price_sale)}
            </span>
            <span className="text-gray-400 line-through text-sm">
              {data?.price_sale && formatPriceVND(data?.price)}
            </span>
          </span>
        </h3>
        {discount.length > 0 && (
          <div className="flex relative mt-5 gap-2">
            <h4 className=" font-bold text-gray-600 shrink-0">Mã giảm giá:</h4>
            <div className=" py-2 scroll-height-3 flex flex-wrap items-center gap-3 max-w-max">
              {discount &&
                discount.map((item, index) => (
                  <DiscountCard key={index} data={item}></DiscountCard>
                ))}
            </div>
          </div>
        )}
        {/* count down */}
        {data.end_date ? (
          <CountDown end_time={data.end_date}></CountDown>
        ) : null}
        {/* variant */}

        {/* variant */}
        {data.type != "single" ? (
          <div className="flex items-center gap-14">
            <h5 className="mt-5 shrink-0 font-bold text-gray-600">Biến thể:</h5>
            {data.variant?.productVariants?.length > 0 ? (
              <Variants
                value={variantSelect}
                setValue={setVariantSelect}
                data={data.variant}
              ></Variants>
            ) : (
              <p className="text-gray-400">No variant</p>
            )}
          </div>
        ) : null}
        <div className="flex gap-14 my-5">
          <h5 className="shrink-0 font-bold text-gray-600">Số lượng:</h5>
          <div className="-ms-2 flex items-center gap-5">
            <div className="flex items-center border">
              <button
                onClick={() => {
                  if (qty > 1) setQty(qty - 1);
                }}
                className="px-5 py-2"
              >
                <FaMinus></FaMinus>
              </button>
              <input
                defaultValue={qty}
                onChange={(e) => {
                  const numQty = Number(e.target.value);
                  setQty(numQty);
                }}
                onBlur={() => {
                  if (qty < 1) setQty(1);
                  if (qty > data.quantity) {
                    setQty(data.quantity);
                    toast.error("Số lượng trong kho không đủ");
                  }
                }}
                value={qty}
                className="border text-lg  outline-none py-1 text-center w-20"
                type="number"
              />
              <button
                onClick={() => {
                  const numQty = Number(qty);
                  if (numQty < data.quantity) {
                    setQty(numQty + 1);
                  } else {
                    toast.error("Số lượng trong kho không đủ");
                  }
                }}
                className="px-5 py-2"
              >
                <FaPlus></FaPlus>
              </button>
            </div>
            <div>
              <p className="text-blue-500">{data.quantity} sản phẩm có sẵn</p>
            </div>
          </div>
        </div>
        {data.quantity < 100 ? (
          <div className="mt-5">
            <p>
              Nhanh lên! Chỉ còn{" "}
              <span className="text-lg px-2 text-red-500">{data.quantity}</span>{" "}
              sản phãm
            </p>
            <div
              className={`h-1 mt-2 relative before:content-[''] overflow-hidden bg-gray-200 rounded-full`}
            >
              <span
                style={{ width: `${data.quantity}%` }}
                className="h-1 bg-red-400 absolute top-0 left-0 bottom-0"
              ></span>
            </div>
          </div>
        ) : null}

        <hr />
        <div className="mt-5">
          <button
            onClick={handleClickToCart}
            className="w-full overflow-hidden py-3 flex gap-2 group justify-center items-center rounded-full font-bold text-white bg-blue-500 uppercase"
          >
            <MdOutlineShoppingCart className="text-2xl -translate-y-11 group-hover:translate-y-[0] transition-all duration-300 bg-blue-500 " />{" "}
            Thêm giỏ hàng{" "}
          </button>
          <button
            onClick={handleClickCheckOut}
            className="w-full group overflow-hidden flex items-center justify-center gap-2 mt-3 rounded-full font-bold text-white py-3 bg-red-500 uppercase"
          >
            <GiTakeMyMoney className="text-2xl -translate-y-11 group-hover:translate-y-[0] transition-all duration-300 " />{" "}
            Mua ngay
          </button>
        </div>
        <div className="flex flex-col md:flex-row  border-b py-3">
          <div className="flex cursor-pointer gap-2 p-3 items-center">
            <LiaRulerHorizontalSolid className="text-xl" />
            Kích thước
          </div>
          <div className="flex cursor-pointer gap-2 p-3 items-center">
            <BsShield className="text-xl" />
            Vận chuyển & trả hàng
          </div>
          <div className="flex cursor-pointer gap-2 p-3 items-center">
            <IoColorPaletteOutline className="text-xl" />
            Màu sắc
          </div>
          <div className="flex cursor-pointer gap-2 p-3 items-center">
            <HiOutlineMail className="text-xl" />
            Hỗ trợ
          </div>
        </div>
        <div className="flex border-b pb-5 justify-between items-center my-5 text-[12px]">
          <div className="flex gap-5 items-center">
            <div className="flex cursor-pointer items-center gap-2">
              <FiHeart />
              <span className="uppercase">Thêm vô yêu thích</span>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <FiLayers />
              <span className="uppercase">So sánh</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineShareAlt className="text-xl" />
            <span className="capitalize">Share</span>
          </div>
        </div>
        <div className="border-b py-4">
          <div className="flex flex-col  gap-2 text-gray-500">
            <p className="flex gap-3">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0178 10.3086C17.7428 10.6002 18.1928 11.4586 18.0261 12.2169L17.6844 13.7669C17.0928 16.4336 15.0011 18.3336 11.9844 18.3336H8.01775C5.00108 18.3336 2.90942 16.4336 2.31775 13.7669L1.97608 12.2169C1.80942 11.4586 2.25941 10.6002 2.98441 10.3086L4.16776 9.83355L8.75943 7.99189C9.55943 7.67523 10.4427 7.67523 11.2427 7.99189L15.8344 9.83355L17.0178 10.3086Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18.3335V8.3335"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8346 6.6665V9.83316L11.243 7.9915C10.443 7.67483 9.55964 7.67483 8.75964 7.9915L4.16797 9.83316V6.6665C4.16797 5.2915 5.29297 4.1665 6.66797 4.1665H13.3346C14.7096 4.1665 15.8346 5.2915 15.8346 6.6665Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0846 4.1665H7.91797V2.49984C7.91797 2.0415 8.29297 1.6665 8.7513 1.6665H11.2513C11.7096 1.6665 12.0846 2.0415 12.0846 2.49984V4.1665Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Estimated Delivery: Sep 07 - Sep 11
            </p>

            <p className="flex gap-2 my-3 text-gray-500">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1328 5.1416C15.7995 6.29993 16.9495 8.1416 17.1828 10.2666"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91016 10.3081C3.12682 8.19144 4.26016 6.34977 5.91016 5.18311"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.82422 17.4502C7.79089 17.9419 8.89089 18.2169 10.0492 18.2169C11.1659 18.2169 12.2159 17.9669 13.1576 17.5085"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.051 6.41654C11.3305 6.41654 12.3677 5.37933 12.3677 4.09987C12.3677 2.82041 11.3305 1.7832 10.051 1.7832C8.77158 1.7832 7.73438 2.82041 7.73438 4.09987C7.73438 5.37933 8.77158 6.41654 10.051 6.41654Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.0237 16.6001C5.30316 16.6001 6.34036 15.5629 6.34036 14.2835C6.34036 13.004 5.30316 11.9668 4.0237 11.9668C2.74424 11.9668 1.70703 13.004 1.70703 14.2835C1.70703 15.5629 2.74424 16.6001 4.0237 16.6001Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.9768 16.6001C17.2563 16.6001 18.2935 15.5629 18.2935 14.2835C18.2935 13.004 17.2563 11.9668 15.9768 11.9668C14.6974 11.9668 13.6602 13.004 13.6602 14.2835C13.6602 15.5629 14.6974 16.6001 15.9768 16.6001Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Trả hàng sau 15 ngày 
            </p>
          </div>
        </div>
        <div>
          <div className="flex my-3 items-center">
            <label htmlFor="" className="min-w-[120px] text-gray-500">
              Trang thái:
            </label>
            <span className="text-[#008a00]">Còn hàng</span>
          </div>
          <div className="flex my-3 items-center">
            <label htmlFor="" className="min-w-[120px] text-gray-500">
              Thương hiệu:
            </label>
            <span className="text-gray-500">{data.brand}</span>
          </div>
          <div className="flex my-3 items-center">
            <label htmlFor="" className="min-w-[120px] text-gray-500">
              Danh mục:
            </label>
            <span className="text-gray-500">{data.category}</span>
          </div>
          {data?.spec?.map((item, index) => (
            <div key={index} className="flex my-3 items-center">
              <label
                htmlFor=""
                className="min-w-[120px] capitalize text-gray-500"
              >
                {item.name}:
              </label>
              <span className="text-gray-500">{item.value}</span>
            </div>
          ))}
          <div className="flex my-3 items-center">
            <label htmlFor="" className="min-w-[120px] text-gray-500">
              Tags:
            </label>
            <span className="text-gray-500">Digital</span>
          </div>
        </div>
        <div className="bg-[#F9F2F2] mt-5 rounded-md flex items-center justify-center p-5">
          <div>
            <p className="text-center mb-2">Guarantee safe & Secure checkout</p>
            <img
              src="https://demo-uminex.myshopify.com/cdn/shop/files/payment2.png?v=1676051512&width=330"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
BoxContent.propTypes = {
  data: PropTypes.object,
  discount: PropTypes.object,
  setData: PropTypes.func,
};
export default BoxContent;
