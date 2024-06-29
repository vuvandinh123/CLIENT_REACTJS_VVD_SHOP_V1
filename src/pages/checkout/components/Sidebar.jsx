/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatPriceVND } from "../../../utils";
import { Link } from "react-router-dom";

const Sidebar = ({ cost }) => {
  const [data, setData] = useState({});
  const [products, setProducts] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [qtyShop, setQtyShop] = useState(1);
  useEffect(() => {
    const checkoutStr = sessionStorage.getItem("checkout") || "[]";
    const checkoutJSON = JSON.parse(checkoutStr);
    console.log(checkoutJSON);
    let qty = 0;
    checkoutJSON.forEach((item) => {
      if (item.order.products.length > 0) {
        qty += 1;
      }
    });
    setQtyShop(qty);
    let flatData = checkoutJSON?.flatMap((item) => {
      return item.order.products;
    });
    let totalPrice = checkoutJSON?.reduce((acc, item) => {
      return acc + item.order.amount;
    }, 0);
    const calculateTotalDiscount = (acc, item) => {
      const { type_price, value } = item.order?.discount || {};
      if (type_price === "percent") {
        return acc + (value / 100) * item.order.amount;
      }
      return acc + (value || 0);
    };
    const totalDiscount = checkoutJSON?.reduce(calculateTotalDiscount, 0);
    setTotalDiscount(totalDiscount);
    setProducts(flatData);
    setData({
      amount: totalPrice,
    });
  }, []);

  const totalAmount =
    (data.amount - totalDiscount < 0 ? 0 : data.amount - totalDiscount) +
    cost * qtyShop;

  return (
    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
      <div>
        {products?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex border-b pb-3 border-gray-200 items-center justify-between gap-5"
            >
              <div className="flex relative gap-2 items-center">
                <div className="w-[90px] relative shrink-0 p-2 rounded-md">
                  <img className="w-full" src={item.thumbnail} alt="" />
                  <span className="block text-white text-center absolute top-0 w-5 right-0 h-5 bg-red-500 rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <h4 className="text-ecl">{item.name}</h4>
              </div>

              <span className="font-bold">
                {formatPriceVND(item.amount || 0)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flow-root">
        <div className="-my-3 divide-y divide-gray-200 ">
          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 ">
              Tổng đơn hàng
            </dt>
            <dd className="text-base font-bold text-gray-900 ">
              {formatPriceVND(data?.amount || 0)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 ">
              Voucher giảm giá
            </dt>
            <dd className="text-base font-bold text-red-500">
              {totalDiscount > 0 ? formatPriceVND(-totalDiscount || 0) : 0}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 ">
              Phí giao hàng
            </dt>
            <dd className="text-base font-bold text-gray-900 ">
              <span className="text-gray-500 font-normal text-[12px]">{`${formatPriceVND(
                cost
              )} x ${qtyShop} = `}</span>
              {formatPriceVND(cost * qtyShop)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-bold text-gray-900 ">Tổng cộng</dt>
            <dd className="text-xl font-bold text-gray-900 ">
              {formatPriceVND(totalAmount || 0)}
            </dd>
          </dl>
        </div>
      </div>
      <div className="space-y-3">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 "
        >
          Thanh toán
        </button>
        <p className="text-[13px] text-gray-500 font-normal text-center ">
          Bạn muốn dùng thêm mã giảm giá hoặc thay đổi số lượng sản phẩm hãy{" "}
          <Link to="/cart" className="text-blue-500 underline">
            Quay lại giỏ hàng
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
