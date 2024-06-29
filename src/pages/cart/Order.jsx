/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import shiping from "../../../public/shiping.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatPriceVND } from "../../utils";

const Order = ({
  totalPrice,
  amount,
  handleClickCheckout,
  productDiscount,
  checkout,
}) => {
  const discount = 1500000;
  const discountAmount = 3;
  const [coupon, setCoupon] = useState("");
  const [mes, setMes] = useState("");

  const hanldeSubmitCoupon = (e) => {
    e.preventDefault();
    try {
      const fetch = async () => {};
      if (coupon != "") {
        fetch();
        setMes("Mã không tồn tại");
      }
    } catch (e) {
      console.error("error:");
    }
  };
  const total = checkout.reduce((acc, item) => {
    return acc + item.order?.amount;
  }, 0);
  return (
    <>
      <div className="py-5 mt-3 px-5 sticky top-16 ">
        <div className=" relative">
          <div
            style={{
              width:
                (total / discount) * 100 >= 100
                  ? "100%"
                  : (total / discount) * 100 + "%",
            }}
            className={`ship h-[6px]  rounded-md bg-red-500`}
          ></div>
          <span className="absolute right-0 -top-[10px] flex items-center justify-center z-20  w-7 h-7 bg-red-500 rounded-full ">
            <img src={shiping} alt="" />
          </span>
        </div>
        <p className="mt-5 text-[12px]">
          {discount - totalPrice <= 0 ? (
            <>{`Congratulations! You've got`} </>
          ) : (
            <>Tiêu {formatPriceVND(discount - totalPrice)} để nhận được </>
          )}
          <span className="text-red-600"> Miễn phí vận chuyển!</span>{" "}
        </p>

        <div className="border-b py-5">
          <p className="uppercase text-sm font-bold">
            Mã giảm giá{" "}
            <span className="ms-1 text-gray-600 capitalize font-thin">
              (Tùy chọn)
            </span>
          </p>
          <small>Mã mua hàng sẽ được áp dụng ở trang thanh toán.</small>
          <div className="mt-5">
            <form onSubmit={hanldeSubmitCoupon} action="" method="post">
              <input
                type="text"
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setMes("");
                }}
                className={`rounded-full ${
                  mes != "" ? "!border-red-500" : ""
                } focus:bg-white focus:border-blue-500 block w-full px-5 border outline-none mt-3 py-3 bg-[#F1F5F6]`}
                placeholder="Mã giảm giá"
              />
              <span className="text-red-500 text-[12px] pl-3 inline-block mt-2">
                {mes != "" && mes}
              </span>
              <button className="bg-red-500 w-full px-3 py-2 rounded-full text-white">
                {" "}
                Lưu
              </button>
            </form>
          </div>
        </div>

        <div className="border-b flex flex-col gap-3 py-5">
          <h4 className="uppercase font-bold mt-2  pb-2">Voucher đã áp dụng</h4>

          {Object.values(productDiscount)?.map((item, index) => (
            <p key={index} className="flex items-center gap-3">
              <svg
                width="12"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-discount text-red-500"
                viewBox="0 0 12 12"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
              {item.name}
            </p>
          ))}

          {totalPrice >= discount && (
            <p className="flex items-center gap-3">
              <svg
                width="12"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-discount text-red-500 color-foreground-"
                viewBox="0 0 12 12"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
              Free shipping discount (-11)
            </p>
          )}
          {/* {amount >= discountAmount && (
            <p className="flex items-center gap-3">
              <svg
                width="12"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-discount text-red-500 color-foreground-"
                viewBox="0 0 12 12"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
              Mua 3 sản phẩm giảm 5%
            </p>
          )} */}
        </div>
        <div className="border-b py-5">
          <div className="flex items-center justify-between">
            <p className="uppercase font-bold">Tổng đơn hàng :</p>
            <span className="uppercase font-bold text-xl text-red-500">
              {formatPriceVND(total)}
            </span>
          </div>
        </div>
        <div className="py-5">
          <p className="text-gray-500 text-[12px] my-3">
            Thuế khuyến mại và phí vận chuyển được tính khi thanh toán
          </p>
          <div>
            <Link
              to={"/checkout"}
              onClick={(e) => {
                handleClickCheckout(e);
              }}
              className="px-10 py-3 block text-center font-bold bg-blue-500 text-white uppercase rounded-full w-full"
            >
              THANH TOÁN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
Order.propTypes = {
  amount: PropTypes.number,
  totalPrice: PropTypes.number,
  handleClickCheckout: PropTypes.func,
};
export default Order;
