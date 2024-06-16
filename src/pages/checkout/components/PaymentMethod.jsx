import { Radio } from "keep-react";
import React from "react";
import PaymentItem from "./PaymentItem";
const data = [
  {
    name: "Thanh toán khi nhận hàng",
    code: "deliver",
  },
  {
    name: "Thanh toán Momo",
    code: "momo",
  },
  {
    name: "Thanh toán ZaloPay",
    code: "zalopay",
  },
];
const PaymentMethod = () => {
  return (
    <div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 ">
          Phương thức thanh toán
        </h3>
        <div className="">
          {data.map((item) => {
            return <PaymentItem key={item.id} data={item}></PaymentItem>;
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
