/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { Button, Dropdown, Radio } from "keep-react";
import {
  addToDiscount,
  getAllDiscountCodeTypeAll,
} from "../../../service/Discount";
import { formatPriceVND, hasCommonElements } from "../../../utils";
import moment from "moment/moment";
import { CiWarning } from "react-icons/ci";

const CartShop = ({
  data,
  setTotal,
  productIds,
  setProductIds,
  productDiscount,
  setProductDiscount,
  ...props
}) => {
  const [discount, setDiscount] = useState([]);

  useEffect(() => {
    const fetchAPi = async () => {
      try {
        const res = await getAllDiscountCodeTypeAll(data.id, {
          shop: data.id,
        });
        setDiscount(res.data);
      } catch (error) {
        console.log(error, "loi");
      }
    };
    fetchAPi();
  }, []);

  const handleSubmitAddVoucher = async (e) => {
    e.preventDefault();
    const { value } = e.target.discount;
    if (value === "") return;
    const check = productDiscount.hasOwnProperty(data.id.toString());
    if (check) {
      if (productDiscount[data.id.toString()].code === value) return;
    }
    const res = await addToDiscount({
      code: value,
      shop_id: data.id,
    });
    setProductDiscount({
      ...productDiscount,
      [data.id.toString()]: {
        ...res.data,
        code: value,
      },
    });
  };
  return (
    <div className="bg-white rounded-md mb-2 border mt-4">
      <div className=" bg-gray-50 rounded-md">
        <div className="flex p-3 items-center gap-3">
          <img
            src={data.logo}
            className="w-[30px] border h-[30px] shrink-0 rounded-full"
            alt=""
          />
          <Link to={`/shops/${data.username}`}>{data.name}</Link>
        </div>
      </div>
      {data?.products?.map((item2) => {
        return (
          <CartItem
            cartId={data.cartId}
            productDiscount={productDiscount}
            setTotal={setTotal}
            productIds={productIds}
            setProductIds={setProductIds}
            key={item2.id}
            data={item2}
            {...props}
          ></CartItem>
        );
      })}
      <div className=" bg-gray-50 rounded-md">
        <div className="flex p-3 items-center gap-3 ">
          {productDiscount?.hasOwnProperty(data.id.toString()) && (
            <div className="flex items-center gap-2">
              <span className="text-red-500 border border-dashed border-red-500 px-3 py-1">
                Đã Giảm{" "}
                {formatPriceVND(productDiscount[data.id.toString()].value)}{" "}
              </span>
            </div>
          )}
          <Dropdown
            action={<button>Thêm voucher</button>}
            actionClassName="border-none rounded-none px-2 py-1 bg-white border border-gray-300 border-dashed text-blue-500 font-bold "
            className="rounded-none before:content-[''] before:border-b-[10px] before:border-blue-300 before:absolute before:block before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:top-[-10px] before:left-10 before:shadow-lg before:transform before:-translate-x-1/2 w-[500px] shadow-lg"
          >
            <Dropdown.List size={"120"} className="">
              <form action="" onSubmit={handleSubmitAddVoucher}>
                <div className="">
                  <ul>
                    <li className="mb-2 bg-gray-50 border-dashed border-2 px-3 py-2 flex gap-2 items-center">
                      <label className="shrink-0" htmlFor="content">
                        Nhập mã voucher:{" "}
                      </label>
                      <div className="flex gap-2 ">
                        <input
                          type="text"
                          placeholder="NHẬP MÃ"
                          className=" border border-blue-500 rounded-md py-3 px-5 outline-none  bg-transparent"
                        />
                        <button
                          className="shrink-0 border px-3 rounded-md bg-red-300 text-white"
                          size="xs"
                        >
                          Áp dụng
                        </button>
                      </div>
                    </li>
                    {discount.length > 0 &&
                      discount.map((item) => (
                        <li
                          className="border-2 mb-1 border-dashed px-3 py-2"
                          key={item.id}
                        >
                          <label
                            htmlFor={`discount-${item.id}`}
                            className="flex items-center gap-2"
                          >
                            <Radio
                              variant="circle"
                              disabled={
                                productIds.length > 0
                                  ? item.applies_to === "all"
                                    ? false
                                    : hasCommonElements(
                                        productIds,
                                        item.productIds?.split(",")
                                      )
                                    ? false
                                    : true
                                  : true
                              }
                              id={`discount-${item.id}`}
                              value={item.code}
                              name="discount"
                            />
                            <div className="ml-2 flex justify-between items-center w-full ">
                              <div>
                                <span className="font-bold text-red-500">
                                  Giảm{" "}
                                  {item.type_price === "fixed_amount"
                                    ? formatPriceVND(item.value)
                                    : `${item.value}%`}
                                </span>

                                <p className="text-gray-400">{item.name}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">
                                  Đơn tối thiểu:{" "}
                                  <span className="text-black">
                                    {formatPriceVND(item.min_order_value)}
                                  </span>
                                </p>
                                <p className="text-gray-400 text-[11px] mt-2">
                                  HSD:{" "}
                                  <span>
                                    {moment(item.end_date).format("DD/MM/YYYY")}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </label>
                          {productIds.length !== 0 &&
                            item.applies_to !== "all" &&
                            !hasCommonElements(
                              productIds,
                              item.productIds?.split(",")
                            ) && (
                              <p className="text-red-400 mt-2  flex items-center bg-yellow-50 px-3 py-1 border gap-2">
                                <CiWarning color="red"></CiWarning> Sản phẩm đã
                                chọn không đáp ứng điều kiện của voucher
                              </p>
                            )}
                        </li>
                      ))}
                  </ul>
                  {productDiscount.hasOwnProperty(data.id.toString()) && (
                    <p className="text-red-400 mt-2  flex items-center bg-yellow-50 px-3 py-1 border gap-2">
                      <CiWarning color="red"></CiWarning> Vui lòng chọn sản phẩm
                      để áp dụng voucher
                    </p>
                  )}
                  <div className="flex justify-end mt-3">
                    <Button size="xs">Áp dụng</Button>
                  </div>
                </div>
              </form>
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CartShop;
